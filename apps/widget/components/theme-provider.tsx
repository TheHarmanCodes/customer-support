"use client"

import * as React from "react"
import { Provider } from "jotai"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ConvexProvider, ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "")

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <ConvexProvider client={convex}>
      {/*
       * Creates the Jotai store used by the widget's client-side screen router.
       * Every descendant can read or update route atoms without passing routing
       * state through component props.
       */}
      <Provider>{children}</Provider>
    </ConvexProvider>
  )
}

export { ThemeProvider }
