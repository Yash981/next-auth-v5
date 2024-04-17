"use server"

import { getUserByEmail, getUserById } from "@/data/user"
import * as z from "zod"
import { CurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { Settingschema } from "@/schema"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import bcrypt from "bcryptjs"
import { unstable_update } from "@/auth"

export const settings = async (values: z.infer<typeof Settingschema>) => {
    const user = await CurrentUser()
    if (!user) {
        return { error: "unauthorized" }
    }
    if(!user.id) {
        return { error: "unauthorized" }
    }
    const dbUser = await getUserById(user.id)

    if (!dbUser) {
        return { error: "unauthorizedd" }
    }
    if(user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    } 
    if(values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email)
        if(existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use" }
        }
        const verificationtoken = await generateVerificationToken(values.email)

        await sendVerificationEmail(verificationtoken.email, verificationtoken.token)

        return { success: "Verification email sent" }
    }
    if(values.password && values.newPassword && dbUser.password){
        const passwordsMatch = await bcrypt.compare(values.password, dbUser.password)
        if(!passwordsMatch) {
            return { error: "Incorrect Password" }
        }
        values.password = await bcrypt.hash(values.newPassword, 10)
        values.newPassword = undefined
    }
    const Updateduser = await db.user.update({
        where: {
            id: dbUser.id
        },
        data: {
            ...values
        }
    })
    unstable_update({
        user:{
            name: Updateduser.name,
            email: Updateduser.email,
            isTwoFactorEnabled: Updateduser.isTwoFactorEnabled,
            role: Updateduser.role
        }
    })

    return { success: "Settings updated" }
}