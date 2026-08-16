import { auth } from "@clerk/nextjs/server"
import React from "react"
import { AuthGuard } from "../modules/auth/ui/components/auth-guard"
import { OrganizationGuard } from "../modules/auth/ui/components/organization-guard"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  await auth.protect()

  return (
    // children is accessed, if we are authenticated and forced to have an Organization
    <AuthGuard>
      <OrganizationGuard>{children}</OrganizationGuard>
    </AuthGuard>
  )
}
