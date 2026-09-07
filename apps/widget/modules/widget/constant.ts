// The complete set of screens supported by the widget's client-side router.
// `WidgetScreen` is derived from this list, keeping route names type-safe.
export const WIDGET_SCREEN = [
  "error",
  "loading",
  "selection",
  "voice",
  "auth",
  "inbox",
  "chat",
  "contact",
] as const

export const CONTACT_SESSION_KEY = "flexdesk_contact_session"
