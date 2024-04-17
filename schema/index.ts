//validating data 
import { UserRole } from "@prisma/client";
import * as z from "zod";

export const Loginschema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    code : z.optional(z.string())
});
export const Registerschema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Minimum 6 characters is required" }),
    name: z.string().min(1, { message: "Name is required" }),
});
export const Resetschema = z.object({
    email: z.string().email({ message: "Email is required" }),
});
export const newPasswordschema = z.object({
    password: z.string().min(6,{ message: "Minimum 6 characters is required" }),
    confirmPassword: z.string().min(6,{ message: "Minimum 6 characters is required" }),
});

export const Settingschema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role:z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6,{ message: "Minimum 6 characters is required" })),
    newPassword: z.optional(z.string().min(6,{ message: "Minimum 6 characters is required" })),
})
    .refine((data) => {
        if(data.password && !data.newPassword){
            return false;
        }
        if(!data.password && data.newPassword){
            return false;
        }
        return true
    },{
        message: "Passwords do not match",
        path: ["newPassword"],
    })