'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { BlogSearch } from './BlogSearch';
import { TagFilters } from './TagFilters';
import { MasonryGrid } from './MasonryGrid';
import { ArticleCard } from '@/components/blog/ArticleCard';
import Pagination from '@/components/Global/Pagination';

export function BlogContent({ articles, content_website, params, pagination }) {
    // State for search query and selected category
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');

    // Configure Fuse.js for fuzzy search
    const fuse = useMemo(() => new Fuse(articles, {
        keys: [
            'attributes.title',
            'attributes.subtitle',
            'attributes.description',
            {
                name: 'attributes.tags.name',
                getFn: article => article.attributes.tags.map(tag => tag.name).join(' ')
            }
        ],
        threshold: 0.3,
    }), [articles]);

    // Filter articles based on search query and category
    const filteredArticles = useMemo(() => {
        let results = articles;

        if (searchQuery) {
            results = fuse.search(searchQuery).map(result => result.item);
        }

        return results.filter(article =>
            selectedType === 'all' || article.attributes.type === selectedType
        );
    }, [searchQuery, selectedType, fuse]);

    return (
        <div className="space-y-8 max-w-[80vw] mx-auto px-6">
            {/* Search Bar */}
            <BlogSearch value={searchQuery} onChange={setSearchQuery} />

            {/* Tag Filters */}
            <TagFilters articles={articles} selectedType={selectedType} onTypeChange={setSelectedType} />

            {/* Masonry Grid */}
            {filteredArticles.length > 0 ? (
                <MasonryGrid
                    items={filteredArticles}
                    renderItem={(article) => (
                        <ArticleCard article={article} content_website={content_website} locale={params.locale} />
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
    );
}
