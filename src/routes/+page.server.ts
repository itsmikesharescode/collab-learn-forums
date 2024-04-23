import type { Actions, PageServerLoad } from "./$types";
import { loginSchema, registerSchema } from "$lib/schema";
import { fail, redirect } from "@sveltejs/kit";
import type { ZodError } from "zod";

import dotenv from 'dotenv';
import transporter from "$lib/helpers.server";
import type { SentMessageInfo } from "nodemailer";

interface EmailMessage {
    from: string;
    bcc: string;
    subject: string;
    html: string;
};

dotenv.config();
const email = process.env.GMAIL_EMAIL;

const sendEmail = async (message: EmailMessage): Promise<SentMessageInfo> => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};


export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
    const { user } = await safeGetSession();
    if (user) return redirect(302, "/dashboard");
};

export const actions: Actions = {


    loginAction: async ({ locals: { supabase }, request }) => {

        const formData = Object.fromEntries(await request.formData());

        try {
            const result = loginSchema.parse(formData);

            const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
                email: result.email,
                password: result.password
            });

            if (loginError) return fail(401, { msg: loginError.message });
            else if (user) return { msg: "Login Success" };

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    registerAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {


        const formData = Object.fromEntries(await request.formData());

        try {

            const result = registerSchema.parse(formData);

            if (result.passwordStrength != "Strong") return fail(401, { msg: "You must choose a strong password." });

            const { data: { user }, error: registerError } = await supabase.auth.signUp({
                email: result.email,
                password: result.password
            });

            if (registerError) return fail(401, { msg: registerError.message });
            else if (user) {
                const { error: insertError } = await supabase.from("user_list_tb").insert([{
                    user_id: user.id,
                    user_email: user.email,
                    user_fullname: `${result.lastName}, ${result.firstName}`,
                }]);

                if (insertError) {
                    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
                    if (deleteUserError) return fail(401, { msg: deleteUserError.message });
                    else return fail(401, { msg: insertError.message });
                } else {
                    const html = ` 
                    <h2>Hi👋 ${result.firstName}, </h2>
                    <p>Thank you for registering in our system.</p>
                    `;
                    const message = {
                        from: email ?? "",
                        bcc: user.email ?? "",
                        subject: "Collab Learn Registration",
                        html,
                    };

                    try {
                        await sendEmail(message);
                        return fail(200, { msg: "Registered Successfully." });
                    } catch (error) {
                        return fail(401, { msg: "There is an error." })
                    }

                }
            }

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }


};