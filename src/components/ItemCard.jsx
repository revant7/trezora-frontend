import React, { useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateCartCountContext from "../context/UpdateCartCount";

export default function ItemCard({ unique_id, name, brand, price, mrp, product_category, image, product_rating }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { setCartCount } = useContext(UpdateCartCountContext);
    const addToCart = async (unique_id) => {
        const user = localStorage.getItem('accessToken');
        if (!user) {
            navigate('/sign-in', { replace: true })
        } else {
            const data = {
                unique_id: unique_id,
                quantity: 1,
            }
            const response = await axios.post(`${API_URL}/api/add-item-to-cart/`, data, { headers: { Authorization: `Bearer ${user}` } })
            const response1 = await axios.get(`${API_URL}/api/get-cart-items/`, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            });
            setCartCount(response1.data.length);

        }

    };

    const goToProductPage = (unique_id) => { navigate(`/product/${unique_id}`) };
    return (
        <div className="group relative bg-gradient-to-br from-white to-neutral-50 rounded-2xl shadow-soft hover:shadow-large smooth-transition duration-500 flex flex-col overflow-hidden border border-neutral-100 hover:border-primary-200 hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 aspect-square">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain cursor-pointer transition-transform duration-700 group-hover:scale-110 p-4"
                    onClick={() => goToProductPage(unique_id)}
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-medium rounded-full shadow-medium backdrop-blur-sm">
                    {product_category}
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 glassmorphism bg-white/90 backdrop-blur-sm rounded-full shadow-soft">
                    <svg className="w-3 h-3 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.567-.955L10 1l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                    <span className="text-xs font-semibold text-neutral-700">{product_rating}</span>
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow space-y-4">

                {/* Product Name */}
                <div className="space-y-2">
                    <h3
                        className="text-lg font-bold text-neutral-800 cursor-pointer hover:text-primary-600 smooth-transition line-clamp-2 leading-tight"
                        onClick={() => goToProductPage(unique_id)}
                    >
                        {name}
                    </h3>

                    {/* Brand */}
                    {brand && (
                        <p className="text-sm text-neutral-500 font-medium">{brand}</p>
                    )}
                </div>

                {/* Price Section */}
                <div className="flex items-end justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span
                                className="text-2xl font-bold text-success-600 cursor-pointer hover:text-success-700 smooth-transition"
                                onClick={() => goToProductPage(unique_id)}
                            >
                                ₹{price.toLocaleString()}
                            </span>
                            {mrp && mrp > price && (
                                <span className="text-sm text-neutral-400 line-through">
                                    ₹{mrp.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {mrp && mrp > price && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold px-2 py-1 bg-success-100 text-success-700 rounded-full">
                                    {Math.round(((mrp - price) / mrp) * 100)}% OFF
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 backdrop-blur-sm group-hover:from-accent-500 group-hover:to-primary-500"
                    onClick={() => addToCart(unique_id)}
                >
                    <span className="flex items-center justify-center gap-2">
                        Add to Cart
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </span>
                </button>
            </div>

            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
            </div>
        </div>
    )
}
