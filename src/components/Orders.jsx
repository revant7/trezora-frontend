import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;

    const getOrderDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/get-orders/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching order details:", error);
            setError("Failed to load order details");
        }
    };

    useEffect(() => {
        getOrderDetails();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold gradient-text mb-4">Your Orders</h1>
                    <p className="text-lg text-neutral-600">Track and manage your purchase history</p>
                </div>

                {orders.length === 0 ? (
                    /* Empty Orders State */
                    <div className="text-center py-20">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-3xl p-12 max-w-md mx-auto border border-white/50">
                            <div className="w-24 h-24 mx-auto mb-6 text-neutral-300">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-700 mb-4">No orders yet</h3>
                            <p className="text-neutral-500 mb-6">Start shopping to see your orders here</p>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105"
                            >
                                Start Shopping
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Orders List */
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <div
                                key={order.order_id}
                                className="glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-medium hover:shadow-large smooth-transition animate-fade-in-up overflow-hidden"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >

                                {/* Order Header */}
                                <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 p-6 border-b border-white/50">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-bold text-neutral-800">
                                                    Order #{order.order_id}
                                                </h3>
                                                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                                                    {order.order_status}
                                                </span>
                                            </div>
                                            <p className="text-neutral-600">
                                                Placed on {order.order_date} at {order.order_time}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-neutral-500">Expected Delivery</p>
                                            <p className="text-lg font-semibold text-neutral-800">{order.order_status}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.order_items.map((item, itemIndex) => (
                                            <div
                                                key={item.product_id}
                                                className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-neutral-100 smooth-transition hover:bg-white/70"
                                            >
                                                {/* Product Image */}
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 flex-shrink-0">
                                                    <img
                                                        src={item.product_image}
                                                        alt={item.product_name}
                                                        className="w-full h-full object-contain p-1"
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-grow">
                                                    <h4 className="font-semibold text-neutral-800 line-clamp-1">
                                                        {item.product_name}
                                                    </h4>
                                                    <p className="text-sm text-neutral-500 mt-1">
                                                        ₹{item.product_price.toLocaleString()} × {item.product_quantity}
                                                    </p>
                                                </div>

                                                {/* Quantity & Total */}
                                                <div className="text-right">
                                                    <p className="text-sm text-neutral-500">Quantity</p>
                                                    <p className="font-semibold text-neutral-800">{item.product_quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-neutral-200">
                                        <button className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-[1.02] active:scale-[0.98]">
                                            Track Order
                                        </button>
                                        <button className="flex-1 py-3 px-4 bg-white/70 border border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-white/90 smooth-transition">
                                            View Details
                                        </button>
                                        <button className="flex-1 py-3 px-4 bg-white/70 border border-neutral-200 text-neutral-700 font-semibold rounded-xl hover:bg-white/90 smooth-transition">
                                            Reorder
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <div className="glassmorphism bg-error-50/70 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-auto border border-error-200">
                            <div className="w-16 h-16 mx-auto mb-4 text-error-500">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-error-700 mb-2">Oops! Something went wrong</h3>
                            <p className="text-error-600">{error}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
