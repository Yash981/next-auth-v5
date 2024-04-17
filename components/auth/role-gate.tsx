"use client"

import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"
import { FormError } from "@/components/form-error"

interface RoleGateProps {
    children: React.ReactNode
    allowedRole: UserRole
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
    const currentRole = useCurrentRole()
    if (currentRole !== allowedRole) {
        return (
            <FormError message="You do not have permission to access this page" />

        )
    }
    return (
        <>
            {children}
        </>
    )
}