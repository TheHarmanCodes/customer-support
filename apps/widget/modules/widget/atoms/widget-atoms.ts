import { atom } from "jotai"
import { WidgetScreen } from "@/modules/widget/types"

/**
 * The widget's in-memory route. Updating this atom switches the visible screen
 * in `WidgetView`; it does not change the browser URL or trigger navigation.
 */
export const screenAtom = atom<WidgetScreen>("auth")
