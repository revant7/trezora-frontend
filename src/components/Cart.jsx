import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UpdateCartCountContext from "../context/UpdateCartCount";


const Cart = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    const { setCartCount } = useContext(UpdateCartCountContext);

    const fetchData = useCallback(async () => {
        const user = localStorage.getItem('accessToken');
        if (!user) {
            navigate('/sign-in', { replace: true })

        } else {
            const response = await axios.get(`${API_URL}/api/get-cart-items/`, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            });
            setApiData(response.data);
            setCartCount(response.data.length);
        }
    }, [navigate]);


    const handleRemoveFromCart = useCallback(async (unique_id) => {
        const user = localStorage.getItem('accessToken');
        if (!user) {
            navigate('/sign-in', { replace: true })

        } else {
            const response = await axios.post(`${API_URL}/api/remove-item-from-cart/`, { unique_id: unique_id }, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            });
            fetchData();

        }

    }, [navigate, fetchData]);


    useEffect(() => {
        fetchData();
    }, [fetchData])
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold gradient-text mb-4">Shopping Cart</h1>
                    <p className="text-lg text-neutral-600">Review your items before checkout</p>
                </div>

                {apiData.length === 0 ? (
                    /* Empty Cart State */
                    <div className="text-center py-20">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-3xl p-12 max-w-md mx-auto border border-white/50">
                            <div className="w-24 h-24 mx-auto mb-6 text-neutral-300">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h4a1 1 0 0 1 0 2v13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 0-2h4zM9 3v1h6V3H9zm0 8a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4zm4 0a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0v-4z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-700 mb-4">Your cart is empty</h3>
                            <p className="text-neutral-500 mb-6">Add some amazing products to get started</p>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105"
                            >
                                Continue Shopping
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Cart Items */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {apiData.map((item, index) => (
                                <div
                                    key={item.prod_unique_id}
                                    className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium hover:shadow-large smooth-transition animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center gap-6">

                                        {/* Product Image */}
                                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 flex-shrink-0">
                                            <img
                                                src={item.prod_image}
                                                alt={item.prod_name}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-grow space-y-2">
                                            <h3 className="text-lg font-bold text-neutral-800 line-clamp-2">
                                                {item.prod_name}
                                            </h3>
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl font-bold text-success-600">
                                                    ₹{item.prod_price.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-neutral-500 px-3 py-1 bg-neutral-100 rounded-full">
                                                    Qty: {item.prod_quantity}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => handleRemoveFromCart(item.prod_unique_id)}
                                            className="w-10 h-10 flex items-center justify-center bg-error-500/10 text-error-500 rounded-xl hover:bg-error-500/20 smooth-transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-error-300"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium sticky top-24">

                                <h3 className="text-xl font-bold text-neutral-800 mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-neutral-600">
                                        <span>Subtotal ({apiData.length} items)</span>
                                        <span>₹{apiData.reduce((total, item) => total + item.prod_price * item.prod_quantity, 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-600">
                                        <span>Shipping</span>
                                        <span className="text-success-600 font-semibold">Free</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-600">
                                        <span>Tax</span>
                                        <span>₹{Math.round(apiData.reduce((total, item) => total + item.prod_price * item.prod_quantity, 0) * 0.18).toLocaleString()}</span>
                                    </div>
                                    <hr className="border-neutral-200" />
                                    <div className="flex justify-between text-xl font-bold text-neutral-800">
                                        <span>Total</span>
                                        <span>₹{(apiData.reduce((total, item) => total + item.prod_price * item.prod_quantity, 0) * 1.18).toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link to="/checkout">
                                    <button className="w-full py-4 bg-gradient-to-r from-success-500 to-success-600 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-success-300 focus:ring-offset-2">
                                        <span className="flex items-center justify-center gap-2">
                                            Proceed to Checkout
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </span>
                                    </button>
                                </Link>

                                <Link
                                    to="/"
                                    className="block text-center mt-4 text-primary-600 hover:text-accent-600 font-medium smooth-transition"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
