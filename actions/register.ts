"use server"
import { Registerschema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
export const register = async (values:z.infer<typeof Registerschema>) => {
    const validatedFields = Registerschema.safeParse(values)
    
    if(!validatedFields.success){
        return { error:"Invalid Fields!" };

    }
    const { email, password, name } = validatedFields.data;
    
    const hashedPassword = await bcrypt.hash(password, 10)

    
    const ExistingUser = await getUserByEmail(email)


    if(ExistingUser){
        return { error:"Email already in use" };
    }

    await db.user.create({
        data: {
            email,
            name,
            password:hashedPassword,
        }
    })
    //TODO send verification token email
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {success: "Confirmation email sent!"}
}