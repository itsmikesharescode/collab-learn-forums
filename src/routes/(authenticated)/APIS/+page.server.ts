import { createGuildSchema, updateInformationSchema, updatePasswordSchema } from "$lib/schema";
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
                console.log(convertedBlob.size)
                const { data: hasPath, error: uploadError } = await supabase.storage.from("collab-learn-bucket").upload(`created-guilds/${user.id}/${result.guildPhoto.name}`, convertedBlob, {
                    cacheControl: "3600",
                    upsert: true
                });

                console.log(uploadError)

                if (uploadError) return fail(401, { msg: uploadError.message });
                else if (hasPath) {
                    const { data: { publicUrl } } = supabase.storage.from("collab-learn-bucket").getPublicUrl(hasPath.path);

                    if (publicUrl) {
                        const { error: insertGuildError } = await supabase.from("created_guild_tb_new").insert([{
                            user_id: user.id,
                            guild_name: result.guildName,
                            guild_max_users: Number(result.maxUsers),
                            guild_joined_count: 0,
                            guild_description: result.guildDescription,
                            guild_host_name: result.hostName,
                            guild_privacy: result.privacy,
                            guild_photo_link: publicUrl,
                            guild_host_photo_link: result.hostPhoto,
                            guild_passcode: `${result.passcode.length ? result.passcode : ""}`
                        }]);

                        if (insertGuildError) return fail(401, { msg: insertGuildError.message });
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
    }
};