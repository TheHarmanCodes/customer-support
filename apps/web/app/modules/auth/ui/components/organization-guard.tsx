"use client"

import { useOrganization } from "@clerk/nextjs"
import React from "react"
import { AuthLayout } from "../layout/auth-layout"
import { OrgSelectView } from "../views/org-select-view"

export const OrganizationGuard = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { organization } = useOrganization()
  if (!organization) {
    return (
      <AuthLayout>
        <OrgSelectView />
      </AuthLayout>
    )
  }
  return <>{children}</>
}
