import { createGuildSchema, joinGuildSchema, updateInformationSchema, updatePasswordSchema, wallPostSchema } from "$lib/schema";
import type { CreatedGuildReference, UserReference } from "$lib/types";
import type { PostgrestError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { ZodError } from "zod";


export const actions: Actions = {
    //edit profile actions
    updatePersonalInformationAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        const { user } = await safeGetSession();

        if (user) {
            try {
                const result = updateInformationSchema.parse(formData);

                const { error: updateUserError } = await supabase.from("user_list_tb").update([{
                    user_fullname: `${result.lastName}, ${result.firstName}`,
                    user_bio: result.bio,
                    user_address: result.address,
                    user_barangay: result.barangay,
                    user_city: result.city,
                    user_religion: result.religion,
                    user_contact: result.contactNumber
                }]).eq("user_id", user.id)

                if (updateUserError) return fail(401, { msg: updateUserError.message });
                else return fail(200, { msg: 'Information Updated Successfully.' });

            } catch (error) {

                const zodError = error as ZodError;
                const { fieldErrors } = zodError.flatten();
                return fail(400, { errors: fieldErrors });
            }
        } else return redirect(302, "/");
    },

    uploadProfileAction: async ({ locals: { supabase, safeGetSession, compressImage }, request }) => {

        const profilePicture = (await request.formData()).get("uploadProfile") as File

        const { user } = await safeGetSession();

        const convertedBlob = await compressImage(profilePicture);

        if (user && convertedBlob) {

            const { data: uploadPicture, error: uploadProfileError } = await supabase.storage.from("collab-bucket").upload(user.id, convertedBlob, {
                cacheControl: "3600",
                upsert: true
            });

            if (uploadProfileError) return fail(401, { msg: uploadProfileError.message });

            else if (uploadPicture) {
                const { data: { publicUrl } } = supabase.storage.from("collab-bucket").getPublicUrl(uploadPicture.path)

                const { error: updateUserError } = await supabase.from("user_list_tb").update([{
                    user_photo_link: `${publicUrl}?${Math.random()}`
                }]).eq("user_id", user.id);

                if (updateUserError) {
                    //this is alternative atm transaction comming soon
                    await supabase.storage.from("collab-bucket").remove([user.id])
                    return fail(401, { msg: updateUserError.message });
                } else return fail(200, { msg: "Upload successfully" });
            }

        } else return redirect(302, "/");

    },

    changePasswordAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = updatePasswordSchema.parse(formData);
            if (result.passwordStrength != "Strong") return fail(401, { msg: "You must choose a strong password." });

            const { data: { user }, error: updatePasswordError } = await supabase.auth.updateUser({
                password: result.password
            });

            if (updatePasswordError) return fail(401, { msg: updatePasswordError.message });
            else if (user) return fail(200, { msg: "Password Successfully Changed." });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    //guild route 
    createGuildAction: async ({ locals: { supabase, safeGetSession, compressImage }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const { user } = await safeGetSession();
            const result = createGuildSchema.parse(formData);
            const convertedBlob = await compressImage(result.guildPhoto);

            if (user && convertedBlob) {
                const { data: hasPath, error: uploadError } = await supabase.storage.from("collab-learn-bucket").upload(`created-guilds/${user.id}/${result.guildPhoto.name}`, convertedBlob, {
                    cacheControl: "3600",
                    upsert: true
                })
                if (uploadError) return fail(401, { msg: uploadError.message });
                else if (hasPath) {
                    const pathObj = hasPath as { path: string, id: string, fullPath: string };
                    const { data: { publicUrl } } = supabase.storage.from("collab-learn-bucket").getPublicUrl(hasPath.path);

                    if (publicUrl) {

                        // will fire a procedure function in edge :D!
                        const { error: insertEdgeFunctionError } = await supabase.rpc("create_guild_new", {
                            user_id_param: user.id,
                            guild_name_param: result.guildName,
                            guild_max_users_param: Number(result.maxUsers),
                            guild_joined_count_param: 1,
                            guild_description_param: result.guildDescription,
                            guild_host_name_param: result.hostName,
                            guild_privacy_param: result.privacy,
                            guild_photo_link_param: publicUrl,
                            guild_host_photo_link_param: result.hostPhoto,
                            guild_passcode_param: `${result.passcode.length ? result.passcode : ""}`,
                            storage_id_param: pathObj.id,
                            storage_fullpath_param: pathObj.fullPath,
                            storage_path_param: pathObj.path
                        });
                        if (insertEdgeFunctionError) return fail(401, { msg: insertEdgeFunctionError.message });
                        else return { msg: "Guild Successfully Created." };
                    }
                }

            }

            return redirect(302, "/no-session");


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    guildPaginateAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = await request.formData();
        const initial = formData.get("initial") as string;
        const final = formData.get("final") as string;

        const { data: paginatedGuilds, error: paginateGuildError } = await supabase.from("created_guild_tb_new").select(`*, guild_joined_tb_new ("*")`).order("created_at", { ascending: false }).range(Number(initial), Number(final));

        if (paginateGuildError) return fail(401, { msg: paginateGuildError.message });
        else if (initial) return {
            paginatedGuilds,
            msg: "Success loaded."
        }
    },

    joinGuildAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const result = joinGuildSchema.parse(formData);
            const { user } = await safeGetSession();
            if (user) {
                const { data, error } = await supabase.rpc("join_guild_new", {
                    user_id_param: user.id,
                    user_photo_link_param: result.userPhotoLink,
                    user_fullname_param: result.userFullname,
                    guild_id_param: Number(result.guildId),
                    passcode_param: result.passcode
                }) as { data: boolean, error: PostgrestError | null }

                if (error) return fail(401, { msg: error.message });
                else if (data) return { msg: "Already Joined" };
                else return { msg: "Joined Success." };
            }

            return redirect(302, "/?no-session")

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    wallPostAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = wallPostSchema.parse(formData);
            const guildObj = JSON.parse(result.guildObj) as CreatedGuildReference;
            const userObj = JSON.parse(result.userObj) as UserReference;
            const { error } = await supabase.from("guild_wall_tb_post_new").insert([{
                guild_id: guildObj.id,
                user_id: userObj.user_id,
                user_fullname: userObj.user_fullname,
                user_photo_link: userObj.user_photo_link,
                wall_post: result.wallPost
            }]);

            if (error) return fail(401, { msg: error.message });
            else return { msg: "Posted Successfully." };

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    deleteWallPostAction: async ({ locals: { supabase, safeGetSession }, request }) => {
        const formData = await request.formData();
        const wallPostId = formData.get("wallPostId") as string;

        const { error } = await supabase.from("guild_wall_tb_post_new").delete().eq("id", Number(wallPostId));
        if (error) return fail(401, { msg: error.message });
        else return { msg: "Successfully deleted." };
    }
};