import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ArticleCard({ article, locale }) {
	return (
		<Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
			<Link href={`/${locale}/blog/${article.attributes.slug}`}>
				<div className="relative aspect-video">
					<Image
						src={
							article.attributes.cover?.data?.attributes?.url ||
							'/placeholder.svg'
						}
						alt={article.attributes.title}
						fill
						className="object-cover"
					/>
				</div>
				<CardHeader>
					<CardTitle className="line-clamp-2">
						{article.attributes.title}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground line-clamp-3 text-sm">
						{article.attributes.description}
					</p>
				</CardContent>
			</Link>
		</Card>
	)
}
