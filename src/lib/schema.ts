import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Must enter a valid email." }),
    password: z.string().min(1, { message: "Must enter a password." })
});

export const registerSchema = z.object({
    passwordStrength: z.string(),
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


export const updateInformationSchema = z.object({
    bio: z.string().min(5, { message: "Must enter a valid bio." }),
    firstName: z.string().min(1, { message: "Must enter a valid first name" }),
    lastName: z.string().min(1, { message: "Must enter a valid last name." }),
    address: z.string().min(3, { message: "Must enter a valid address." }),
    barangay: z.string().min(3, { message: "Must enter a valid barangay" }),
    city: z.string().min(3, { message: "Must enter a valid city." }),
    religion: z.string().min(3, { message: "Must enter a valid religion" }),
    contactNumber: z.string().min(8, { message: "Must enter a valid contact number." }),
});

export const updatePasswordSchema = z.object({
    passwordStrength: z.string(),
    password: z.string().min(6, { message: "Must choose a strong password." }),
    confirmPassword: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Password and Confirm Password must match",
            path: ["confirmPassword"]
        });
    }
});

export const createGuildSchema = z.object({
    guildPhoto: z.instanceof(File),
    guildName: z.string().min(4, { message: "Enter a valid guild name." }),
    maxUsers: z.string().refine(val => Number(val) > 0, { message: "Must enter a valid max users." }),
    guildDescription: z.string().min(5, { message: "Must enter a valid description." }),
    privacy: z.string().min(1, { message: "Must choose privacy." }),
    passcode: z.string()
}).superRefine(({ privacy, passcode }, ctx) => {
    if (privacy === "private") {
        if (passcode.length < 6) {
            ctx.addIssue({
                code: "custom",
                message: "Must enter a strong passcode.",
                path: ["passcode"]
            });
        }
    }
})

