import React from "react"
import { AuthGuard } from "../modules/auth/ui/components/auth-guard"
import { OrganizationGuard } from "../modules/auth/ui/components/organization-guard"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // children is accessed, if we are authenticated and forced to have an Organization
    <AuthGuard>
      <OrganizationGuard>{children}</OrganizationGuard>
    </AuthGuard>
  )
}

export default layout
