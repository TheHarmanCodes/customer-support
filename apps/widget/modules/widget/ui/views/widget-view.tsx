"use client"
import React from "react"
// import { WidgetFooter } from "../components/widget-footer"
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen"

interface Props {
  organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetAuthScreen />
      {/*<div>Widget View {organizationId}</div>*/}
      {/*<WidgetFooter />*/}
    </main>
  )
}
