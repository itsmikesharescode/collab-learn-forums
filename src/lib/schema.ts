import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Must enter a valid email." }),
    password: z.string().min(1, { message: "Must enter a password." })
});

export const registerSchema = z.object({
    firstName: z.string().min(1, { message: "Must enter a valid first name." }).max(10, { message: "Maximum char for first name is 10." }),
    lastName: z.string().min(1, { message: "Must enter a valid last name." }).max(10, { message: "Maximum char for last name is 10." }),
    email: z.string().email().max(20, { message: "Maximum char for email is 10." }),
    password: z.string().min(6, { message: "Must choose a strong password." }),
    confirmPassword: z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });
    }
});

