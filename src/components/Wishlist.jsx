import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ItemCard from './ItemCard';
import AuthenticationContext from '../context/AuthenticationContext';

export default function Wishlist() {
    const { isAuthenticated } = useContext(AuthenticationContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchWishlist = async () => {
        if (!isAuthenticated) {
            setError('Please sign in to view your wishlist');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/get-wishlist/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (response.data.success && Array.isArray(response.data.data)) {
                setWishlistItems(response.data.data);
                setError('');
            } else {
                setError(response.data.message || 'Failed to load wishlist');
            }
        } catch (err) {
            console.error('Error fetching wishlist:', err);
            if (err.response?.status === 401) {
                setError('Please sign in to view your wishlist');
            } else {
                setError('Failed to load wishlist');
            }
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await axios.delete(`${API_URL}/api/remove-from-wishlist/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                data: {
                    unique_id: productId
                }
            });

            if (response.data.success) {
                setWishlistItems(prev => prev.filter(item => item.unique_id !== productId));
            } else {
                setError('Failed to remove item from wishlist');
                setTimeout(() => setError(''), 3000);
            }
        } catch (err) {
            console.error('Error removing from wishlist:', err);
            setError('Failed to remove item from wishlist');
            setTimeout(() => setError(''), 3000);
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(`${API_URL}/api/add-item-to-cart/`, {
                unique_id: productId,
                quantity: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                // Optionally remove from wishlist after adding to cart
                await removeFromWishlist(productId);
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
            setError('Failed to add item to cart');
            setTimeout(() => setError(''), 3000);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [isAuthenticated]);

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

    const AuthRequired = () => (
        <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-700 mb-3">Sign in required</h3>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Please sign in to view and manage your wishlist.
            </p>
            <Link
                to="/sign-in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105 active:scale-95"
            >
                Sign In
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-20">
                        <div className="animate-spin w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full mx-auto mb-4"></div>
                        <p className="text-lg text-neutral-600">Loading your wishlist...</p>
                    </div>
                </div>
            </div>
        );
    }

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
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-xl">
                        <p className="text-error-600 font-medium">{error}</p>
                    </div>
                )}

                {/* Content */}
                {!isAuthenticated ? (
                    <AuthRequired />
                ) : wishlistItems.length === 0 ? (
                    <EmptyWishlist />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item, index) => (
                            <div
                                key={item.unique_id}
                                className="animate-fade-in-up relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Remove from Wishlist Button */}
                                <button
                                    onClick={() => removeFromWishlist(item.unique_id)}
                                    className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-error-500 hover:bg-error-50 hover:text-error-600 smooth-transition shadow-medium"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <ItemCard
                                    unique_id={item.unique_id}
                                    name={item.name}
                                    brand={item.brand}
                                    price={item.price}
                                    mrp={item.mrp}
                                    product_category={item.product_category}
                                    image={item.image}
                                    product_rating={item.product_rating}
                                    showAddToCart={true}
                                    onAddToCart={() => addToCart(item.unique_id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
