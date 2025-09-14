import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 299,
            originalPrice: 399,
            image: '/images/headphone.jpg',
            category: 'Electronics',
            rating: 4.8,
            inStock: true,
            addedDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Smart Watch Pro',
            price: 199,
            originalPrice: 249,
            image: '/images/watches.jpg',
            category: 'Wearables',
            rating: 4.6,
            inStock: true,
            addedDate: '2024-01-10'
        },
        {
            id: 3,
            name: 'MacBook Air M2',
            price: 1199,
            originalPrice: 1299,
            image: '/images/macbook.jpg',
            category: 'Laptops',
            rating: 4.9,
            inStock: false,
            addedDate: '2024-01-05'
        }
    ]);

    const handleRemoveFromWishlist = (id) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    const handleMoveToCart = (id) => {
        // Handle moving item to cart
        console.log('Moving item to cart:', id);
    };

    const EmptyWishlist = () => (
        <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-700 mb-3">Your wishlist is empty</h3>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Save items you love by clicking the heart icon. They'll appear here for easy access.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105 active:scale-95"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Continue Shopping
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-8">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

            <div className="relative max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold gradient-text mb-2">My Wishlist</h1>
                        <p className="text-lg text-neutral-600">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                        </p>
                    </div>

                    {wishlistItems.length > 0 && (
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-300 smooth-transition">
                                Clear All
                            </button>
                            <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105 active:scale-95">
                                Share Wishlist
                            </button>
                        </div>
                    )}
                </div>

                {/* Wishlist Items or Empty State */}
                {wishlistItems.length === 0 ? (
                    <EmptyWishlist />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="group glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-medium hover:shadow-glow-purple smooth-transition overflow-hidden">

                                {/* Product Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                                    />

                                    {/* Stock Status Badge */}
                                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${item.inStock
                                        ? 'bg-success-100 text-success-800'
                                        : 'bg-error-100 text-error-800'
                                        }`}>
                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                    </div>

                                    {/* Remove from Wishlist */}
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-error-500 hover:bg-error-50 hover:text-error-600 smooth-transition"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                                </div>

                                {/* Product Info */}
                                <div className="p-6">

                                    {/* Category & Rating */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-2 py-1 rounded-lg">
                                            {item.category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-warning-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm font-medium text-neutral-600">{item.rating}</span>
                                        </div>
                                    </div>

                                    {/* Product Name */}
                                    <h3 className="text-lg font-bold text-neutral-800 mb-3 line-clamp-2 group-hover:text-primary-600 smooth-transition">
                                        {item.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-2xl font-bold text-primary-600">
                                            ${item.price}
                                        </span>
                                        {item.originalPrice > item.price && (
                                            <span className="text-sm text-neutral-400 line-through">
                                                ${item.originalPrice}
                                            </span>
                                        )}
                                        {item.originalPrice > item.price && (
                                            <span className="text-xs font-semibold text-success-600 bg-success-50 px-2 py-1 rounded">
                                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                            </span>
                                        )}
                                    </div>

                                    {/* Added Date */}
                                    <p className="text-xs text-neutral-500 mb-4">
                                        Added on {new Date(item.addedDate).toLocaleDateString()}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleMoveToCart(item.id)}
                                            disabled={!item.inStock}
                                            className={`flex-1 py-2 px-4 rounded-xl font-semibold smooth-transition ${item.inStock
                                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-glow-purple hover:scale-105 active:scale-95'
                                                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {item.inStock ? 'Add to Cart' : 'Notify When Available'}
                                        </button>
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-300 smooth-transition hover:scale-105 active:scale-95 flex items-center justify-center"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recommendations */}
                {wishlistItems.length > 0 && (
                    <div className="mt-16">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/50 shadow-medium">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                You might also like
                            </h3>
                            <p className="text-neutral-600 mb-4">
                                Based on your wishlist, we think you'll love these items too!
                            </p>
                            <Link
                                to="/recommendations"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-primary-500 text-white font-semibold rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105 active:scale-95"
                            >
                                View Recommendations
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
