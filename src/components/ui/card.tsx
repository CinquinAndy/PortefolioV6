import * as React from 'react'

import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string
}

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
	<div className={cn('rounded-xl border bg-card text-card-foreground shadow', className)} ref={ref} {...props} />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
	<div className={cn('flex flex-col space-y-1.5 p-6', className)} ref={ref} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(({ className, ...props }, ref) => (
	<div className={cn('font-semibold leading-none tracking-tight', className)} ref={ref} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(({ className, ...props }, ref) => (
	<div className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
	<div className={cn('p-6 pt-0', className)} ref={ref} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
	<div className={cn('flex items-center p-6 pt-0', className)} ref={ref} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
export type { CardProps, CardContentProps, CardDescriptionProps, CardFooterProps, CardHeaderProps, CardTitleProps }
