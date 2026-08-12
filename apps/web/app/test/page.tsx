import { auth } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"

export default async function Page() {
  await auth.protect()

  return (
    <>
      <div>Auth Test Page !!</div>
      <UserButton />
      <p>User authenticated</p>
    </>
  )
}
