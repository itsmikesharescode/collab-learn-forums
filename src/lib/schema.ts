import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Must enter a valid email." }),
    password: z.string().min(1, { message: "Must enter a password." })
});

export const registerSchema = z.object({
    firstName: z.string().min(1, { message: "Must enter a valid first name." }).max(10, { message: "Maximum char for first name is 10." }),
    lastName: z.string().min(1, { message: "Must enter a valid last name." }).max(10, { message: "Maximum char for last name is 10." }),
})

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;