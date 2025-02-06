// components/blog/ArticleCard.jsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardEyebrow, CardFooter } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export function ArticleCard({ article, locale }) {
    const { attributes } = article

    return (
        <Card>
            <Link href={`/${locale}/blog/${attributes.slug}`}>
                <div className="relative">
                    {/* Image Container with gradient overlay */}
                    <div className="relative aspect-video overflow-hidden">
                        <Image
                            src={attributes?.image_presentation?.data?.attributes?.url || '/placeholder.svg'}
                            alt={attributes?.image_presentation?.data?.attributes?.alternativeText}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Enhanced gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-1000 via-slate-1000/70 to-transparent" />
                    </div>

                    <div className="relative z-10">
                        <CardHeader>
                            <div className="space-y-4">
                                {/* Type and Date */}
                                <div className="flex items-center justify-between">
                                    <CardEyebrow>{attributes.type}</CardEyebrow>
                                    <time className="text-sm text-gray-400">
                                        {formatDate(attributes.createdAt)}
                                    </time>
                                </div>

                                {/* Title */}
                                <CardTitle className="line-clamp-2">
                                    {attributes.title}
                                </CardTitle>

                                {/* Subtitle */}
                                {attributes.subtitle && (
                                    <p className="text-md text-purple-400">
                                        {attributes.subtitle}
                                    </p>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent>
                            {/* Description */}
                            <p className="line-clamp-3 text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                                {attributes.excerpt || attributes.description}
                            </p>
                        </CardContent>

                        <CardFooter className="flex flex-col items-start gap-4">
                            {/* Tags */}
                            {attributes.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {attributes.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Associated links */}
                            {attributes.links?.length > 0 && (
                                <div className="flex gap-2">
                                    {attributes.links.map((link) => (
                                        <Link
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-cyan-400 hover:text-cyan-300"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Meta info */}
                            <div className="flex w-full items-center justify-between text-sm text-gray-400">
                                <span>Rank: {attributes.rank}</span>
                                <span>{attributes.locale.toUpperCase()}</span>
                            </div>
                        </CardFooter>
                    </div>
                </div>
            </Link>
        </Card>
    )
}