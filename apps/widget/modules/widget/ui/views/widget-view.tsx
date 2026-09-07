"use client"
import React from "react"
import { useAtomValue } from "jotai"
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen"
import { screenAtom } from "@/modules/widget/atoms/widget-atoms"

interface Props {
  organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
  // Subscribes this view to route changes. When another component writes to
  // `screenAtom`, Jotai re-renders this view with the matching screen below.
  const screen = useAtomValue(screenAtom)

  // This is the router's route-to-screen registry. Add a screen here when a
  // new value is added to `WIDGET_SCREEN`; placeholder entries mark routes
  // whose UI has not been implemented yet.
  const screenComponents = {
    error: <p>TODO: Error</p>,
    loading: <p>TODO: Loading</p>,
    selection: <p>TODO: selection</p>,
    voice: <p>TODO: Voice</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>TODO: Inbox</p>,
    chat: <p>TODO: Chat</p>,
    contact: <p>TODO: Contact</p>,
  }

  return (
    <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {/* Renders only the component selected by the current Jotai route. */}
      {screenComponents[screen]}
    </main>
  )
}
