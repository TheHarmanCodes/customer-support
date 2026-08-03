"use client"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { useMutation, useQuery } from "convex/react"

export default function Page() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <p>apps/widget</p>
      <Button onClick={() => addUser()}>Add user</Button>
      <div className="mx-auto w-full max-w-sm">{JSON.stringify(users)}</div>
    </div>
  )
}
