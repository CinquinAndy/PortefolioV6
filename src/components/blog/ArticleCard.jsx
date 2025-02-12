import { useRef } from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const getArticleUrl = (locale, slug) => {
	if (!slug) return `/${locale}/blog`
	return `/${locale}/blog/${slug}`
}

export function ArticleCard({ article, locale }) {
	// Reference to the card element for scroll animations
	const ref = useRef(null)

	// Generate the article URL
	const articleUrl = getArticleUrl(locale, article.attributes.slug)

	return (
		<Link className="block" href={articleUrl}>
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="group"
				initial={{ opacity: 0, y: 20 }}
				ref={ref}
				transition={{ duration: 0.3 }}
			>
				<Card className="relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
					{/* Animated background image container */}
					<motion.div className="absolute inset-0 -z-10">
						<div
							// The image is set to cover and anchored at the top (bg-top)
							className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
							style={{
								backgroundImage: `url(${article.attributes.image_presentation?.data?.attributes?.url || '/placeholder.svg'})`,
							}}
						/>
						<div className="absolute inset-0 left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-black/80 to-black/95" />
					</motion.div>

					{/* Card Header with a gradient overlay behind the text */}
					<CardHeader className="relative z-10 pt-48">
						{/* Gradient overlay with blur for improved text readability */}
						<div className="relative">
							<div className="flex items-center justify-between text-sm">
								<time className="text-white/90">
									{article.attributes.createdAt}
								</time>
								<Badge
									className="border-white/20 bg-white/10 text-white"
									variant="outline"
								>
									{article.attributes.type}
								</Badge>
							</div>
							<CardTitle className="mt-4 text-xl font-bold text-white transition-colors group-hover:text-purple-300">
								{article.attributes.title}
							</CardTitle>
							<CardDescription className="text-white/80">
								{article.attributes.subtitle}
							</CardDescription>
						</div>
					</CardHeader>

					{/* Card Content displaying only the first 5 tags */}
					<CardContent className="relative z-10">
						<div className="flex flex-wrap gap-2">
							{article.attributes.tags?.slice(0, 5).map(tag => (
								<Badge
									className="border-purple-500/30 bg-purple-500/20 text-white"
									key={tag.id}
									variant="secondary"
								>
									{tag.name}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</Link>
	)
}
