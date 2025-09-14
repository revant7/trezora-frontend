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

    useEffect(() => {

        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                const API_URL = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${API_URL}/api/search-products/?q=${encodeURIComponent(query)}&page=${currentPage}`);
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
    }, [query, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <div className="mb-12">
                    <div className="glassmorphism bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/50 shadow-medium">
                        <h2 className="text-3xl font-bold text-neutral-800 mb-2">
                            Search Results
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Found results for: <span className="font-semibold text-primary-600">"{query}"</span>
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-neutral-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>{searchResults.length} products found</span>
                        </div>
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
                                        product_category={item.product_category[0]}
                                        name={item.name}
                                        price={item.price}
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