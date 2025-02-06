'use client'

import { useState, useMemo } from 'react'
import { MasonryGrid } from "./MasonryGrid"
import { BlogSearch } from "./BlogSearch"
import { TagFilters } from "./TagFilters"
import Pagination from '@/components/Global/Pagination'
import {ArticleCard} from "@/components/blog/ArticleCard";

export function BlogContent({ articles, content_website, params, pagination }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedType, setSelectedType] = useState('all')

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesSearch = article.attributes.title.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                article.attributes.subtitle.toLowerCase()
                    .includes(searchQuery.toLowerCase())

            const matchesType = selectedType === 'all' ||
                article.attributes.type === selectedType

            return matchesSearch && matchesType
        })
    }, [articles, searchQuery, selectedType])

    return (
        <div className="space-y-8 max-w-[80vw] mx-auto px-6">
            {/* Barre de recherche */}
            <BlogSearch
                value={searchQuery}
                onChange={setSearchQuery}
            />

            {/* Filtres par tags */}
            <TagFilters
                articles={articles}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
            />

            {/* Grid d'articles */}
            {filteredArticles.length > 0 ? (
                <MasonryGrid
                    items={filteredArticles}
                    renderItem={(article) => (
                        <ArticleCard
                            article={article}
                            content_website={content_website}
                            locale={params.locale}
                        />
                    )}
                />
            ) : (
                <div className="text-center text-white py-12">
                    <div>No articles found</div>
                </div>
            )}

            {/* Pagination */}
            <div className="mt-8">
                <Pagination {...pagination} />
            </div>
        </div>
    )
}