import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

export default function CategoryPage() {
    const { categoryName } = useParams();
    const formattedCategory = categoryName.replace(/-/g, " ");

    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('relevance');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // Get unique brands from results
    const availableBrands = [...new Set(searchResults.map(product => product.brand).filter(Boolean))];

    useEffect(() => {
        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                const API_URL = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${API_URL}/api/search-products/?q=${encodeURIComponent(formattedCategory)}&page=${currentPage}`);
                console.log(response.data);
                setSearchResults(response.data.products || []);
                setFilteredResults(response.data.products || []);
                setNumberOfPages(response.data.total_pages || 0);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
                setFilteredResults([]);
                setIsLoading(false);
            }
        };

        if (formattedCategory) {
            fetchSearchResults();
        }
    }, [formattedCategory, currentPage]);

    // Apply filters and sorting
    useEffect(() => {
        let filtered = [...searchResults];

        // Price filter
        filtered = filtered.filter(product => {
            const price = parseFloat(product.price) || 0;
            return price >= priceRange.min && price <= priceRange.max;
        });

        // Brand filter
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product => selectedBrands.includes(product.brand));
        }

        // Sorting
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
                break;
            case 'price-high':
                filtered.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
                break;
            case 'rating':
                filtered.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // relevance - keep original order
                break;
        }

        setFilteredResults(filtered);
    }, [searchResults, sortBy, priceRange, selectedBrands]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBrandToggle = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSortBy('relevance');
        setPriceRange({ min: 0, max: 10000 });
        setSelectedBrands([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 pt-12">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <div className="w-12 h-1 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"></div>
                    </div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">
                        {formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)}
                    </h1>
                    <p className="text-lg text-neutral-600">
                        {isLoading ? 'Loading products...' : `${filteredResults.length} products found`}
                    </p>
                </div>

                {/* Controls Bar */}
                <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl shadow-large border border-white/50 p-6 mb-8 animate-fade-in-up">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Left side - View mode and filters */}
                        <div className="flex items-center gap-4">
                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2 bg-neutral-100 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg smooth-transition ${
                                        viewMode === 'grid' 
                                            ? 'bg-white shadow-medium text-primary-600' 
                                            : 'text-neutral-500 hover:text-neutral-700'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg smooth-transition ${
                                        viewMode === 'list' 
                                            ? 'bg-white shadow-medium text-primary-600' 
                                            : 'text-neutral-500 hover:text-neutral-700'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                            {/* Filters Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                                </svg>
                                Filters
                                {(selectedBrands.length > 0 || priceRange.min > 0 || priceRange.max < 10000) && (
                                    <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                                        {selectedBrands.length + (priceRange.min > 0 || priceRange.max < 10000 ? 1 : 0)}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Right side - Sort dropdown */}
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-neutral-700">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-neutral-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent smooth-transition"
                            >
                                <option value="relevance">Relevance</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-neutral-200/50 animate-fade-in-up">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-3">Price Range</label>
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={priceRange.min}
                                                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                                                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={priceRange.max}
                                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 10000 }))}
                                                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div className="text-xs text-neutral-500">
                                            ₹{priceRange.min} - ₹{priceRange.max}
                                        </div>
                                    </div>
                                </div>

                                {/* Brands */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-3">Brands</label>
                                    <div className="max-h-32 overflow-y-auto space-y-2">
                                        {availableBrands.map(brand => (
                                            <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => handleBrandToggle(brand)}
                                                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                                />
                                                <span className="text-sm text-neutral-700">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                <div className="flex items-end">
                                    <button
                                        onClick={clearFilters}
                                        className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800 border border-neutral-200 rounded-lg hover:bg-neutral-50 smooth-transition"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Products Section */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4"></div>
                            <p className="text-neutral-600 text-lg">Loading amazing products...</p>
                        </div>
                    </div>
                ) : filteredResults.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800 mb-2">No products found</h3>
                        <p className="text-neutral-600 mb-6">Try adjusting your filters or search criteria</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Products Grid/List */}
                        <div className={`animate-fade-in-up ${
                            viewMode === 'grid' 
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                                : 'space-y-4'
                        }`}>
                            {filteredResults.map((product, index) => (
                                viewMode === 'grid' ? (
                                    <div key={product.unique_id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                        <ItemCard
                                            unique_id={product.unique_id}
                                            name={product.name}
                                            brand={product.brand}
                                            price={product.price}
                                            mrp={product.mrp}
                                            product_category={product.product_category}
                                            image={product.image}
                                            product_rating={product.rating}
                                        />
                                    </div>
                                ) : (
                                    <div key={product.unique_id} className="glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl shadow-large border border-white/50 p-6 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="md:w-48 md:h-48 w-full h-64">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-full h-full object-contain rounded-xl bg-white"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col h-full">
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-neutral-800 mb-2">{product.name}</h3>
                                                        <p className="text-neutral-600 mb-2">{product.brand}</p>
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <span className="text-2xl font-bold gradient-text">₹{product.price}</span>
                                                            {product.mrp && parseFloat(product.mrp) > parseFloat(product.price) && (
                                                                <span className="text-neutral-500 line-through">₹{product.mrp}</span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <div className="flex text-yellow-400">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'fill-neutral-200'}`} viewBox="0 0 20 20">
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-neutral-600">({product.rating || 0})</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <button className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105 font-semibold">
                                                            Add to Cart
                                                        </button>
                                                        <button className="px-4 py-3 border border-primary-500 text-primary-600 rounded-xl hover:bg-primary-50 smooth-transition">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        {/* Pagination */}
                        {numberOfPages > 1 && (
                            <div className="flex justify-center mt-12 animate-fade-in-up">
                                <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl shadow-large border border-white/50 p-2">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50 smooth-transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        
                                        {[...Array(numberOfPages)].map((_, index) => {
                                            const pageNum = index + 1;
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`px-4 py-2 rounded-lg smooth-transition ${
                                                        currentPage === pageNum
                                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-medium'
                                                            : 'hover:bg-primary-50 text-neutral-700'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                        
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === numberOfPages}
                                            className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-50 smooth-transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}