
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/30",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-2 focus:ring-destructive/30",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/30",
        ghost: "hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent/30",
        link: "text-primary underline-offset-4 hover:underline focus:ring-2 focus:ring-primary/30",
        // Add a new variant specifically for the back button
        back: "text-gray-600 dark:text-gray-300 hover:text-portfolio-purple hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-portfolio-purple/30 focus:ring-offset-1"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        data-testid={props["data-testid"] || `button-${variant || 'default'}`}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
