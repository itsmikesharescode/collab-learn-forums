import { updateInformationSchema } from "$lib/schema";
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
};