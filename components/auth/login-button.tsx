"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Dialog,DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { LoginForm } from './login-form'

type Props = {
  mode?: "modal" | "redirect",
  children: React.ReactNode,
    asChild?: boolean

}


function LoginButton({children,mode,asChild}: Props) {
    const router = useRouter()
    const handleClick = () => {
        router.push('/auth/login')
    }
  if(mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
            <LoginForm/>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <span onClick={handleClick} className="cursor-pointer">
        {children}
    </span>
  )
}

export default LoginButton