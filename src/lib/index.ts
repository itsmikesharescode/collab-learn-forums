import { writable, type Writable } from "svelte/store"
import type { AuthState, StaticStates, UserReference } from "./types";
import { getContext, setContext } from "svelte";
import type { SupabaseClient } from "@supabase/supabase-js";

//supabase client
export const supabase = writable<SupabaseClient | null>();

// static stores
export const setStaticState = (state: StaticStates) => {
    const stateGenerator = writable(state);
    setContext("staticState", stateGenerator);
};
export const getStaticState = () => getContext<Writable<StaticStates>>("staticState");


// auth stores
export const setAuthState = (state: AuthState) => {
    const stateGenerator = writable(state);
    setContext("staticState", stateGenerator)
}
export const getAuthState = () => getContext<Writable<AuthState>>("staticState");

// user stores
export const setUserState = (state: UserReference | null) => {
    const stateGenerator = writable(state);
    setContext("userState", stateGenerator);
}
export const getUserState = () => getContext<Writable<UserReference | null>>("userState");

