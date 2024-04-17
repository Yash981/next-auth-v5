"use server"
import * as z from "zod"

import { Resetschema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset =  async (values:z.infer<typeof Resetschema>)=>{

    const validatedFields = Resetschema.safeParse(values)

    if(!validatedFields.success){
        return { error:"Invalid Email!"}
    }
    const { email } = validatedFields.data;
    
    // console.log(email,'emailll')
    const ExistingUser = await getUserByEmail(email)

    if(!ExistingUser){
        return { error:"Email not found Please Register" }
    }
    if(!ExistingUser.email){
        return { error:"Email not found Please Register" }
    }
    // console.log(ExistingUser,'existinguser')
    if(ExistingUser.emailVerified){
        console.log("hello")
        const passwordResetToken = await generatePasswordResetToken(ExistingUser.email)
        // console.log(verificationToken,'verificationToken')
        await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token,
          );

        return { success: "Password Reset Email sent!" }
    }
    return { error:"Email not verified" }

}
