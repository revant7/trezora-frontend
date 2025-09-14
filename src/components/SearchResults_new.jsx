import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ItemCard from './ItemCard';
import PageFooter from './PageFooter';

export default function SearchResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Enhanced search filters
    const [filters, setFilters] = useState({
        sortBy: 'relevance',
        priceRange: { min: '', max: '' },
        category: '',
        rating: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    // Categories for filter dropdown
    const categories = [
        'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books',
        'Beauty & Personal Care', 'Automotive', 'Health & Wellness'
    ];

    useEffect(() => {
        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                const API_URL = process.env.REACT_APP_API_URL;

                // Build query parameters
                const params = new URLSearchParams({
                    q: query,
                    page: currentPage.toString()
                });

                // Add filters to query
                if (filters.sortBy !== 'relevance') {
                    params.append('sort', filters.sortBy);
                }
                if (filters.priceRange.min) {
                    params.append('min_price', filters.priceRange.min);
                }
                if (filters.priceRange.max) {
                    params.append('max_price', filters.priceRange.max);
                }
                if (filters.category) {
                    params.append('category', filters.category);
                }
                if (filters.rating) {
                    params.append('min_rating', filters.rating);
                }

                const response = await axios.get(`${API_URL}/api/search-products/?${params.toString()}`);
                console.log(response.data);
                setSearchResults(response.data.products);
                setNumberOfPages(response.data.total_pages);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setIsLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query, currentPage, filters]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setCurrentPage(1);
    };

    const handlePriceRangeChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            priceRange: {
                ...prev.priceRange,
                [type]: value
            }
        }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({
            sortBy: 'relevance',
            priceRange: { min: '', max: '' },
            category: '',
            rating: ''
        });
        setCurrentPage(1);
    };

    if (!query) {
        return <div>Please enter a search query.</div>;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Loading Header */}
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 mx-auto mb-4 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-pulse"></div>
                            <div className="absolute inset-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-neutral-600 mb-2">Searching...</h2>
                        <p className="text-neutral-500">Finding amazing products for "{query}"</p>
                    </div>

                    {/* Loading Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl p-6 animate-pulse">
                                <div className="aspect-square bg-neutral-200 rounded-xl mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-neutral-200 rounded-lg w-3/4"></div>
                                    <div className="h-4 bg-neutral-200 rounded-lg w-1/2"></div>
                                    <div className="h-6 bg-neutral-200 rounded-lg w-1/3"></div>
                                    <div className="h-10 bg-neutral-200 rounded-xl"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Search Results Header */}
                <div className="mb-8">
                    <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-800 mb-1">
                                    Search Results
                                </h2>
                                <p className="text-lg text-neutral-600">
                                    Found results for: <span className="font-semibold text-primary-600">"{query}"</span>
                                </p>
                                <div className="mt-2 flex items-center gap-2 text-neutral-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <span>{searchResults.length} products found</span>
                                </div>
                            </div>

                            {/* Sort and Filter Toggle */}
                            <div className="flex items-center gap-3">
                                {/* Sort Dropdown */}
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="px-4 py-2 bg-white/50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                                >
                                    <option value="relevance">Sort: Relevance</option>
                                    <option value="price_low_high">Price: Low to High</option>
                                    <option value="price_high_low">Price: High to Low</option>
                                    <option value="rating">Rating</option>
                                    <option value="newest">Newest First</option>
                                </select>

                                {/* Filter Toggle Button */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`px-4 py-2 rounded-xl font-medium smooth-transition flex items-center gap-2 ${showFilters
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-white/50 text-neutral-700 hover:bg-white/70'
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                                    </svg>
                                    Filters
                                </button>
                            </div>
                        </div>

                        {/* Advanced Filters Panel */}
                        {showFilters && (
                            <div className="mt-6 pt-6 border-t border-neutral-200 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                                    {/* Price Range */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Price Range</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={filters.priceRange.min}
                                                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={filters.priceRange.max}
                                                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                                            />
                                        </div>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                                        <select
                                            value={filters.category}
                                            onChange={(e) => handleFilterChange('category', e.target.value)}
                                            className="w-full px-3 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Rating Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">Minimum Rating</label>
                                        <select
                                            value={filters.rating}
                                            onChange={(e) => handleFilterChange('rating', e.target.value)}
                                            className="w-full px-3 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition"
                                        >
                                            <option value="">Any Rating</option>
                                            <option value="4">4+ Stars</option>
                                            <option value="3">3+ Stars</option>
                                            <option value="2">2+ Stars</option>
                                            <option value="1">1+ Stars</option>
                                        </select>
                                    </div>

                                    {/* Clear Filters */}
                                    <div className="flex items-end">
                                        <button
                                            onClick={clearFilters}
                                            className="w-full px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 smooth-transition font-medium"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {searchResults.length === 0 ? (
                    /* No Results State */
                    <div className="text-center py-20">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-3xl p-12 max-w-md mx-auto border border-white/50">
                            <div className="w-24 h-24 mx-auto mb-6 text-neutral-300">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-700 mb-4">No products found</h3>
                            <p className="text-neutral-500 mb-6">Try searching with different keywords or browse our categories</p>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105"
                            >
                                Browse Categories
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Search Results Grid */
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {searchResults.map((item, index) => (
                                <div
                                    key={item.unique_id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <ItemCard
                                        unique_id={item.unique_id}
                                        image={item.image}
                                        product_category={item.product_category && item.product_category[0]}
                                        name={item.name}
                                        brand={item.brand}
                                        price={item.price}
                                        mrp={item.mrp}
                                        product_rating={item.product_rating}
                                    />
                                </div>
                            ))}
                        </div>

                        <PageFooter currentPage={currentPage} totalPages={numberOfPages} onPageChange={handlePageChange} />
                    </div>
                )}
            </div>
        </div>
    );
}