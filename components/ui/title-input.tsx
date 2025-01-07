import * as React from "react"
import { Input } from "./input"
import { cn } from "@/lib/utils"

export interface TitleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TitleInput = React.forwardRef<HTMLInputElement, TitleInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn("h-auto !text-2xl py-4 font-semibold", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
TitleInput.displayName = "TitleInput"

export { TitleInput } 