import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const fancyCardVariants = cva("w-full relative", {
  variants: {
    variant: {
      dots: [
        "relative mx-auto w-full",
        "rounded-lg border border-dashed",
        "border-zinc-300 dark:border-zinc-800",
        "px-4 sm:px-6 md:px-8",
      ],
    },
  },
  defaultVariants: {
    variant: "dots",
  },
})

export interface FancyCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fancyCardVariants> {}

const FancyCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props}>
    {props.children}
  </div>
))
FancyCardContent.displayName = "FancyCardContent"

const FancyCard = React.forwardRef<HTMLDivElement, FancyCardProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(fancyCardVariants({ variant, className }))}
        {...props}
      >
        <div className="absolute left-0 top-4 -z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:top-6 md:top-8" />
        <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:bottom-6 md:bottom-8" />
        <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
          <div className="absolute z-0 grid h-full w-full items-center">
            <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
              <div className="rounded-full outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-cyan-400 -translate-x-[2.5px]" />
              <div className="rounded-full outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-cyan-400 translate-x-[2.5px] place-self-end" />
              <div className="rounded-full outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-cyan-400 -translate-x-[2.5px]" />
              <div className="rounded-full outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-cyan-400 translate-x-[2.5px] place-self-end" />
            </section>
          </div>
          <div className="relative z-20 mx-auto py-8">
            <FancyCardContent>{children}</FancyCardContent>
          </div>
        </div>
      </div>
    )
  },
)
FancyCard.displayName = "FancyCard"

export { FancyCard, FancyCardContent }
