import type { UserReference } from "$lib/types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession } }) => {

    const { user } = await safeGetSession();

    if (user) {
        return {
            userData: await supabase.from("user_list_tb").select("*").eq("user_id", user.id).limit(1).single() as PostgrestSingleResponse<UserReference>,
        }
    }


};