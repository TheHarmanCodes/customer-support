// app/page.tsx
import Home from "@/components/Home"
import { auth } from "@clerk/nextjs/server"

export default async function Page() {
  await auth.protect()

  return <Home />
}
