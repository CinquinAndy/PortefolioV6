import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

export function ArticleCard({ article, locale }) {
    const { attributes } = article;
    const articleUrl = attributes.slug ? `/${locale}/blog/${attributes.slug}` : "#";

    return (
        <Card className="group relative isolate">
            <Link href={articleUrl}>
                {/* Image Container with gradient overlay */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={attributes?.image_presentation?.data?.attributes?.url || '/placeholder.svg'}
                        alt={attributes?.image_presentation?.data?.attributes?.alternativeText}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full backdrop-blur-sm bg-slate-900/50">
                    <CardHeader>
                        <time className="text-sm font-medium text-gray-300">{formatDate(attributes.createdAt)}</time>
                        <CardTitle className="text-2xl font-bold text-white">{attributes.title}</CardTitle>
                        <p className="text-lg font-medium text-purple-300">{attributes.subtitle}</p>
                    </CardHeader>
                </div>
            </Link>
        </Card>
    );
}
