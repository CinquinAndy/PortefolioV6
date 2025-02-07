import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function ArticleCard({ article }) {
    // Reference to the card element for scroll animations
    const ref = useRef(null);

    // Use framer-motion's scroll hook to track the scroll progress
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Create a y-axis transform based on scroll progress
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <Card className="relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[400px]">
                {/* Animated background image container */}
                <motion.div
                    className="absolute inset-0 -z-10"
                    style={{ y }}
                >
                    <div
                        // The image is set to cover and anchored at the top (bg-top)
                        className="absolute w-full h-full inset-0 bg-cover bg-top transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${article.attributes.image_presentation?.data?.attributes?.url || '/placeholder.svg'})` }}
                    />
                    {/* Overall gradient overlay to darken the image */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />
                </motion.div>

                {/* Card Header with a gradient overlay behind the text */}
                <CardHeader className="relative z-10 pt-48">
                    {/* Gradient overlay with blur for improved text readability */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/70 to-transparent blur-sm" />
                    <div className="relative">
                        <div className="flex items-center justify-between text-sm">
                            <time className="text-white/90">{article.attributes.createdAt}</time>
                            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                                {article.attributes.type}
                            </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-white mt-4 group-hover:text-purple-300 transition-colors">
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
                                key={tag.id}
                                variant="secondary"
                                className="bg-purple-500/20 text-white border-purple-500/30"
                            >
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
