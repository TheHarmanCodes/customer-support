"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Label } from "@workspace/ui/components/label"

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "vertical" | "horizontal"
}) {
  return (
    <div
      data-slot="field"
      data-orientation={orientation}
      className={cn(
        "group/field flex flex-col gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[invalid=true]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group-data-[invalid=true]/field:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FieldError({
  className,
  errors,
  children,
  ...props
}: React.ComponentProps<"p"> & {
  errors?: Array<{ message?: string } | undefined | null | string>
}) {
  const content = errors
    ? errors
        .map((e) => (typeof e === "string" ? e : e?.message))
        .filter(Boolean)
        .join(", ")
    : children

  if (!content) {
    return null
  }

  return (
    <p
      data-slot="field-error"
      className={cn("text-destructive text-sm font-medium", className)}
      {...props}
    >
      {content}
    </p>
  )
}

export {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
}
