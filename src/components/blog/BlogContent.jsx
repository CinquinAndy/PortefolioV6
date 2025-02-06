// BlogContent.jsx (Client Component)
'use client'

import { useState } from 'react'
import { CardMasonry } from "./CardMasonry"
import { TagFilters } from "./TagFilters"
import Pagination from '@/components/Global/Pagination'

export function BlogContent({ articles, params, pagination }) {
    const [filteredArticles, setFilteredArticles] = useState(articles)
    const [selectedType, setSelectedType] = useState('all')

    const handleTypeChange = (type) => {
        setSelectedType(type)
        if (type === 'all') {
            setFilteredArticles(articles)
        } else {
            setFilteredArticles(articles.filter(article => article.attributes.type === type))
        }
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <TagFilters
                    articles={articles}
                    selectedType={selectedType}
                    onTypeChange={handleTypeChange}
                />
            </div>

            {filteredArticles.length > 0 ? (
                <CardMasonry articles={filteredArticles} params={params} />
            ) : (
                <div className="text-center text-white py-12">
                    <p>No articles found</p>
                </div>
            )}

            <div className="mt-8">
                <Pagination {...pagination} />
            </div>
        </main>
    )
}