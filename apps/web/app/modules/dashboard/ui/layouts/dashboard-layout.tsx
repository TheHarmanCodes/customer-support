import { AuthGuard } from "@/app/modules/auth/ui/components/auth-guard"
import { OrganizationGuard } from "@/app/modules/auth/ui/components/organization-guard"
import {
  SIDEBAR_COOKIE_NAME,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import { cookies } from "next/headers"
import React from "react"
import { DashbordSidebar } from "../components/dashboard-sidebar"

export const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value !== "false"

  return (
    <AuthGuard>
      <OrganizationGuard>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashbordSidebar />
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  )
}
