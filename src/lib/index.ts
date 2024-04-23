import { writable, type Writable } from "svelte/store"
import type { StaticStates } from "./types";
import { getContext, setContext } from "svelte";



export const setStaticState = (state: StaticStates) => {
    const stateGenerator = writable(state);
    setContext("staticState", stateGenerator);
};

export const getStaticState = () => getContext<Writable<StaticStates>>("staticState");