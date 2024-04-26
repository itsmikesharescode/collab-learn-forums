import type { CreatedGuildReference, CreatedModuleReference, CreatedProjectReference, JoinedGuildReference, JoinedProjectReference, UserReference } from "$lib/types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession }, url }) => {

    const { user } = await safeGetSession();

    if (user) {

        let initial = 0;
        let final = 5;


        if (url.pathname.startsWith("/guilds")) {
            if (url.search) {
                initial = Number(url.search.slice(2).split("-")[0]);
                final = Number(url.search.slice(2).split("-")[1]);
            }
        }

        return {
            userData: await supabase.from("user_list_tb").select("*").eq("user_id", user.id).limit(1).single() as PostgrestSingleResponse<UserReference>,
            createdGuilds: await supabase.from("created_guild_tb_new").select(`*, guild_joined_tb_new ("*")`).order("created_at", { ascending: false }).range(initial, final) as PostgrestSingleResponse<CreatedGuildReference[]>,
            guildCount: await supabase.from("created_guild_tb_new").select("*", { count: "exact" }) as PostgrestSingleResponse<CreatedGuildReference[]>,

            /* createdGuilds: await supabase.from("created_guild_tb").select("*").order('id', { ascending: false }) as PostgrestSingleResponse<CreatedGuildReference[]>,
            joinedGuilds: await supabase.from("joined_guild_tb").select("*").eq("user_id", user.id).order('id', { ascending: false }) as PostgrestSingleResponse<JoinedGuildReference[]>,
            createdProjects: await supabase.from("created_projects_tb").select("*").order('id', { ascending: false }) as PostgrestSingleResponse<CreatedProjectReference[]>,
            recentProjects: await supabase.from("created_projects_tb").select("*").eq("user_id", user.id).order("id", { ascending: false }) as PostgrestSingleResponse<CreatedProjectReference[]>,
            joinedProjects: await supabase.from("joined_project_tb").select("*").order("id", { ascending: false }) as PostgrestSingleResponse<JoinedProjectReference[]>,
            createdModules: await supabase.from("created_module_tb").select("*").order('id', { ascending: false }) as PostgrestSingleResponse<CreatedModuleReference[]> */
        }
    }

    return redirect(302, "/?no-session")


};