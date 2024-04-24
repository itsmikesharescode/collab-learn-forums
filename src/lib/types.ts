
//form type
export interface ResultModel<T> {
    status: number
    type: string
    data: T
}

// types for static states
export interface StaticStates {
    register: boolean
    forgotPass: boolean
    checkCode: boolean
    verified: boolean
}

// types for authenticated states
export interface AuthState {
    activeURL: string

    dashboard: {
        recentProjectArray: CreatedProjectReference[] | null,
        joinedGuildArray: JoinedGuildReference[] | null
    }

    /*  projects: {
         joinedProject: boolean
         showEditTools: boolean
         showSettings: boolean
         createdProjects: CreatedProjectReference[] | null
         projectObj: CreatedProjectReference | null
     }
 
     guilds: {
         createdGuilds: CreatedGuildReference[] | null
         joinedGuild: boolean
         guildObj: CreatedGuildReference | null
         guildNotes: GuildWallReference[] | null
         guildNoteObj: GuildWallReference | null
         guildChats: GuildChatReference[] | null
     }
 
     modules: {
         createdModules: CreatedModuleReference[] | null
         moduleObj: CreatedModuleReference | null
         showModule: boolean
          moduleComments: ModuleCommentsReference[] | null
     } */
}

//user_list_tb
export type UserReference = {
    id: number
    created_at: string
    user_id: string
    user_email: string
    user_fullname: string
    user_photo_link: string
    user_bio: string
    user_address: string
    user_barangay: string
    user_city: string
    user_religion: string
    user_contact: string
}

//created_guild_tb
export type CreatedGuildReference = {
    id: number
    created_at: string
    user_id: string
    host_name: string
    is_private: boolean
    guild_name: string
    max_users: number
    joined_count: number
    description: string
    passcode: string
    image_url: string
    host_photo: string
    searchTerms: string
}


//joined_guild_tb
export type JoinedGuildReference = {
    id: number
    created_at: string
    user_id: string
    user_photo_link: string
    user_fullname: string
    guild_id: string
    guild_name: string
    passcode: string
    host_name: string
    guild_image_url: string
}


//created_projects_tb
export type CreatedProjectReference = {
    id: number
    created_at: string
    user_id: string
    project_name: string
    max_users: number
    description: string
    passcode: string
    host_name: string
    is_private: boolean
    joined_count: number
    image_url: string
    host_photo: string
    searchTerms: string
}

//joined_project_tb
export type JoinedProjectReference = {
    id: number
    created_at: string
    user_id: string
    user_photo_link: string
    user_fullname: string
    project_id: string
    project_name: string
    passcode: string
    host_name: string
    project_image_url: string
}

//created_module_tb
export type CreatedModuleReference = {
    id: number
    created_at: string
    user_id: string
    module_name: string
    description: string
    host_name: string
    host_photo: string
    image_url: string
    module_link: string
    file_name: string
    total_views: number
    searchTerms: string
}