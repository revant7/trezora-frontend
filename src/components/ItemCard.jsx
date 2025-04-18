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
        <div className="max-w-xs bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            <img
                src={image}
                alt={name}
                className="rounded-t-lg w-full h-48 object-contain cursor-pointer"
                height="100px"
                width="140px"
                onClick={() => goToProductPage(unique_id)}
            />
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product_category}</h3>

                {/* Name section with fixed height and overflow handling */}
                <p className="text-gray-600 text-sm mb-3 h-12 overflow-hidden line-clamp-2 cursor-pointer" onClick={() => goToProductPage(unique_id)}>
                    {name}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-green-600 cursor-pointer" onClick={() => goToProductPage(unique_id)}>₹{price}</span>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.567-.955L10 1l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-700">{product_rating}</span>
                    </div>
                </div>

                {/* Button sticks to the bottom of the card */}
                <button
                    className="w-full py-2 mt-auto px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-md"
                    onClick={() => addToCart(unique_id)}
                >
                    Add to Cart
                </button>
            </div>
        </div>

    )
}
