"use server"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { newPasswordschema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export const newPassword = async (values:z.infer<typeof newPasswordschema>,token? :string | null) => {
    if(!token){
        return {error:"Missing Token"}
    }
    console.log(token)
    const validatedPassword = newPasswordschema.safeParse(values)
    if(!validatedPassword.success){
        return {error:"Invalid Password"}
    }
    const {password,confirmPassword} = validatedPassword.data

    if(password !== confirmPassword){
        return {error:"Passwords do not match"}
    }
    
    const existingToken = await getPasswordResetTokenByToken(token)

    if(!existingToken){
        return {error:"Invalid Token"}
    }
    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error:"Token has expired"}
    }

    const ExistingUser = await getUserByEmail(existingToken.email)

    if(!ExistingUser){
        return {error:"Email not found"}
    }

    const hashedPassword = await bcrypt.hash(password,10)

    await db.user.update({
        where: {
            id: ExistingUser.id,
        },
        data: {
            password: hashedPassword,
        }
    })
    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id,
        },
    })

    return { success:"Password Reset Successful"}
}