'use client'
import { signOut } from "next-auth/react"

const SignOutBtn = () => {
  return (
    <button onClick={() => signOut()}>Sign Out</button>
  )
}

export default SignOutBtn
