


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