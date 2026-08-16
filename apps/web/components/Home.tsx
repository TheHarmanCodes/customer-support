"use client"

import { Authenticated, Unauthenticated } from "convex/react"
import { useMutation, useQuery } from "convex/react"
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs"

import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"

export default function Home() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)

  return (
    <>
      <Authenticated>
        <div className="flex min-h-svh flex-col items-center justify-center">
          <UserButton />
          <OrganizationSwitcher />

          <p>apps/web</p>

          <Button className="cursor-pointer" onClick={() => addUser()}>
            Add
          </Button>

          <div className="mx-auto w-full max-w-sm">{JSON.stringify(users)}</div>
        </div>
      </Authenticated>

      <Unauthenticated>
        <p>Must be Authenticated</p>
        <SignInButton />
      </Unauthenticated>
    </>
  )
}
