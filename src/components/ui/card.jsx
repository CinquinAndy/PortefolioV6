import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from 'framer-motion'

const Card = React.forwardRef(({className, ...props}, ref) => (
    <motion.div
        ref={ref}
        initial="idle"
        whileHover="hover"
        variants={{
            idle: { scale: 1 },
            hover: { scale: 1.02 },
        }}
        className={cn(
            "group relative overflow-hidden rounded-2xl bg-slate-1000/80",
            "backdrop-blur-xl backdrop-saturate-150",
            "transition-all duration-300 ease-out",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative z-10 p-8 space-y-1.5",
            "after:absolute after:inset-0 after:bg-gradient-to-t after:from-slate-1000 after:to-transparent after:opacity-60",
            className
        )}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({className, ...props}, ref) => (
    <h3
        ref={ref}
        className={cn(
            "mt-3 font-display text-xl text-white",
            "transition-colors duration-300 group-hover:text-purple-400",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({className, ...props}, ref) => (
    <p
        ref={ref}
        className={cn(
            "mt-2 text-sm text-gray-400",
            "transition-colors duration-300 group-hover:text-gray-300",
            className
        )}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative p-8 pt-0",
            "after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-slate-1000/80",
            className
        )}
        {...props}
    />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative z-10 flex items-center p-8 pt-0",
            className
        )}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

// Nouveau composant pour le tag/eyebrow
const CardEyebrow = React.forwardRef(({className, ...props}, ref) => (
    <span
        ref={ref}
        className={cn(
            "text-sm font-medium text-purple-400",
            "transition-colors duration-300 group-hover:text-purple-300",
            className
        )}
        {...props}
    />
))
CardEyebrow.displayName = "CardEyebrow"

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    CardEyebrow
}