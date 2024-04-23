import type { Actions, PageServerLoad } from "./$types";
import { fail, superValidate } from "sveltekit-superforms"
import { loginSchema } from "$lib/schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(loginSchema)),
    };
};

export const actions: Actions = {


    loginAction: async (event) => {
        const { locals: { supabase } } = event;

        const form = await superValidate(event, zod(loginSchema));

        if (!form.valid) {
            return fail(400, {
                form,
            });
        };

        const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
            email: form.data.email,
            password: form.data.password
        });

        if (loginError) return fail(401, { msg: loginError.message });
        else if (user) return { msg: "Log in success." };

    }
};