"use client"

import * as React from "react"
import { cn } from "@/shared/lib/utils"

// A lightweight, dependency-free popover implementation 
// replicating standard radix/shadcn behavior.

const PopoverContext = React.createContext<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>({});

const Popover = ({ open, onOpenChange, children }: { open?: boolean, onOpenChange?: (open: boolean) => void, children: React.ReactNode }) => {
  return (
    <PopoverContext.Provider value={{ open, onOpenChange }}>
      <div className={cn("relative isolate text-left w-full h-full", open ? "z-50" : "")}>{children}</div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
  ({ asChild, children, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(PopoverContext)
    const renderChildren = () => {
      if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
          ref,
          onClick: (e: any) => {
            if (onOpenChange) onOpenChange(!open);
            const child = children as React.ReactElement<any>;
            if (child.props.onClick) child.props.onClick(e);
          },
          ...props,
          "data-state": open ? "open" : "closed",
        });
      }
      return children;
    };
    return <>{renderChildren()}</>;
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: string, sideOffset?: number }>(
  ({ className, align = "center", sideOffset = 4, children, ...props }, ref) => {
    const { open } = React.useContext(PopoverContext)

    if (!open) return null;

    return (
      <div
        ref={ref}
        style={{ marginTop: sideOffset }}
        className={cn(
          "absolute top-full left-0 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
