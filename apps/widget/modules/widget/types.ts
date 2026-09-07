import { WIDGET_SCREEN } from "./constant"

// A route name accepted by `screenAtom` and the `WidgetView` screen map.
export type WidgetScreen = (typeof WIDGET_SCREEN)[number]
