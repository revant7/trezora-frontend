import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default function Checkout() {
    const [apiData, setApiData] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Get user token
    const user = localStorage.getItem('accessToken');

    // Calculate cart totals
    const subtotal = cartData.reduce((total, item) => total + (item.prod_price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const deliverycharge = subtotal > 500 ? 0 : 50; // Free delivery above ₹500
    const total = subtotal + tax + deliverycharge;

    useEffect(() => {
        fetchApiData();
        fetchCartData();
    }, []);

    const fetchApiData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/user-profile/`, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            });
            setApiData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to load user data. Please try again.");
        }
    };

    const fetchCartData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/cart/`, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            });
            setCartData(response.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
            setError("Failed to load cart data. Please try again.");
        }
    };

    const CompleteOrder = async () => {
        if (!paymentMethod) {
            setError("Please select a payment method to continue.");
            return;
        }

        if (!apiData?.address?.address) {
            setError("Please add your delivery address to continue.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const orderData = {
                items: cartData.map(item => ({
                    product_id: item.prod_id,
                    quantity: item.quantity,
                    price: item.prod_price
                })),
                payment_method: paymentMethod,
                shipping_address: {
                    address: apiData.address.address,
                    city: apiData.address.city,
                    state: apiData.address.state,
                    pincode: apiData.address.pincode,
                    country: "India"
                },
                order_total: total
            };

            const response = await axios.post(`${API_URL}/api/create-order/`, orderData, {
                headers: {
                    Authorization: `Bearer ${user}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                // Clear cart after successful order
                await axios.delete(`${API_URL}/api/clear-cart/`, {
                    headers: {
                        Authorization: `Bearer ${user}`
                    }
                });
                navigate('/orders', {
                    state: { justOrdered: true, orderId: response.data.order_id },
                    replace: true
                });
            } else {
                setError(response.data.message || "Failed to create order. Please try again.");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            setError(error.response?.data?.message || "Failed to create order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6 pt-12">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <div className="w-12 h-1 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"></div>
                    </div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">Secure Checkout</h1>
                    <p className="text-lg text-neutral-600">Complete your purchase securely and safely</p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 glassmorphism bg-error-50/70 backdrop-blur-xl border border-error-200/50 rounded-2xl p-4 animate-fade-in-up">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-error-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <p className="text-error-700 font-medium">{error}</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Delivery & Payment */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Delivery Address Card */}
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-3xl shadow-large border border-white/50 p-8 animate-fade-in-up">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-neutral-800">Delivery Address</h2>
                                    <p className="text-neutral-600">Where should we deliver your order?</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-neutral-50 to-white border border-neutral-200/50 rounded-2xl p-6">
                                {apiData === null ? (
                                    <div className="flex items-center gap-3">
                                        <div className="animate-spin w-5 h-5 border-2 border-primary-200 border-t-primary-500 rounded-full"></div>
                                        <span className="text-neutral-600">Loading address details...</span>
                                    </div>
                                ) : !apiData?.address?.address ? (
                                    <div className="text-center py-6">
                                        <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-error-600 mb-2">Address Required</h3>
                                        <p className="text-error-500 mb-4">Please add your delivery address to continue with checkout.</p>
                                        <button
                                            onClick={() => navigate('/profile')}
                                            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-glow-purple smooth-transition hover:scale-105"
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-neutral-800">
                                                Delivering to {apiData.first_name} {apiData.last_name}
                                            </h3>
                                        </div>
                                        <p className="text-neutral-700 leading-relaxed">
                                            {apiData.address.address}, {apiData.address.city}, {apiData.address.state}, {apiData.address.pincode}, India
                                        </p>
                                        <button
                                            onClick={() => navigate('/profile')}
                                            className="mt-4 text-primary-600 hover:text-primary-700 font-medium smooth-transition"
                                        >
                                            Change Address →
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Method Card */}
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-3xl shadow-large border border-white/50 p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-neutral-800">Payment Method</h2>
                                    <p className="text-neutral-600">Choose your preferred payment option</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* UPI Section */}
                                <div className="border border-neutral-200/50 rounded-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b border-neutral-200/50">
                                        <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-2">
                                            <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded text-white flex items-center justify-center text-xs font-bold">₹</span>
                                            UPI Payments
                                        </h3>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 smooth-transition cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="amazonpay"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-orange-600 font-bold text-sm">AP</span>
                                                </div>
                                                <span className="font-semibold text-neutral-700">Amazon Pay</span>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 smooth-transition cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="googlepay"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-blue-600 font-bold text-sm">GP</span>
                                                </div>
                                                <span className="font-semibold text-neutral-700">Google Pay</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Cards Section */}
                                <div className="border border-neutral-200/50 rounded-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-neutral-200/50">
                                        <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            Debit & Credit Cards
                                        </h3>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200/50 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 smooth-transition cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="visa"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-blue-600 font-bold text-xs">VISA</span>
                                                </div>
                                                <span className="font-semibold text-neutral-700">Visa</span>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200/50 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 smooth-transition cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="mastercard"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-red-600 font-bold text-xs">MC</span>
                                                </div>
                                                <span className="font-semibold text-neutral-700">Mastercard</span>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200/50 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 smooth-transition cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="rupay"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-green-600 font-bold text-xs">RP</span>
                                                </div>
                                                <span className="font-semibold text-neutral-700">RuPay</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Cash on Delivery */}
                                <div className="border border-neutral-200/50 rounded-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 border-b border-neutral-200/50">
                                        <h3 className="font-bold text-lg text-neutral-800 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Cash on Delivery
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <label className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200/50 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 smooth-transition cursor-pointer">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cash"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-5 h-5 text-primary-600 focus:ring-primary-500"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-neutral-700">Pay with Cash</span>
                                                    <p className="text-sm text-neutral-500">Pay when your order is delivered</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-3xl shadow-large border border-white/50 p-8 sticky top-32 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-success-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-neutral-800">Order Summary</h2>
                                    <p className="text-neutral-600">{cartData.length} item{cartData.length !== 1 ? 's' : ''}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-neutral-600">Subtotal</span>
                                    <span className="font-semibold text-neutral-800">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-neutral-600">Tax (10%)</span>
                                    <span className="font-semibold text-neutral-800">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-neutral-600">Delivery</span>
                                        {deliverycharge === 0 && (
                                            <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-semibold">FREE</span>
                                        )}
                                    </div>
                                    <span className="font-semibold text-neutral-800">
                                        {deliverycharge === 0 ? 'FREE' : `₹${deliverycharge.toFixed(2)}`}
                                    </span>
                                </div>
                                <hr className="border-neutral-200" />
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-lg font-bold text-neutral-800">Total</span>
                                    <span className="text-2xl font-bold gradient-text">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {deliverycharge === 0 && (
                                <div className="bg-gradient-to-r from-success-50 to-emerald-50 border border-success-200/50 rounded-xl p-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-success-700 font-semibold">Free delivery on orders above ₹500!</span>
                                    </div>
                                </div>
                            )}

                            <button
                                className={`w-full py-4 rounded-2xl font-bold text-lg smooth-transition transform active:scale-95 ${loading || apiData === null || !apiData?.address?.address || !paymentMethod
                                        ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-large hover:shadow-glow-purple hover:scale-[1.02]'
                                    }`}
                                disabled={loading || apiData === null || !apiData?.address?.address || !paymentMethod}
                                onClick={CompleteOrder}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                                        Processing Order...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Complete Secure Order
                                    </div>
                                )}
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-neutral-500">
                                    🔒 Your payment information is encrypted and secure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}