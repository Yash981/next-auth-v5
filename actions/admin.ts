"use server"

import { CurrentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export async function admin() {
    const role = await CurrentRole();
    if (role === UserRole.ADMIN) {
        return { success: "Allowed Sever Action!" };
    }
    return { error: "Forbidden Sever Action!" };
}