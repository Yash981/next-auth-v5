import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'



export function Social() {
  const onclick = (provider: string) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT})
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={()=>onclick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={()=>onclick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}