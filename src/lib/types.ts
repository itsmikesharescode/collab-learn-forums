


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