import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateCartCountContext from "../context/UpdateCartCount";


const Cart = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    const { setCartCount } = useContext(UpdateCartCountContext);

    const fetchData = useCallback(async () => {
        const user = localStorage.getItem('accessToken');
        if (!user) {
            navigate('/sign-in', { replace: true })

        } else {
            const response = await axios.get("http://127.0.0.1:8000/api/get-cart-items/", {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            });
            setApiData(response.data);
            setCartCount(response.data.length);
        }
    }, [navigate]);


    const handleRemoveFromCart = useCallback(async (asin) => {
        const user = localStorage.getItem('accessToken');
        if (!user) {
            navigate('/sign-in', { replace: true })

        } else {
            const response = await axios.post("http://127.0.0.1:8000/api/remove-item-from-cart/", { asin: asin }, {
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
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>

            {apiData.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {apiData.map((item) => (
                        <li
                            key={item.prod_asin}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.prod_image}
                                    alt={item.prod_name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{item.prod_name}</h3>
                                    <p className="text-gray-500">₹{item.prod_price}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Qty: {item.prod_quantity}</span>
                                <button
                                    onClick={() => handleRemoveFromCart(item.prod_asin)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {apiData.length > 0 && (
                <div className="mt-6 text-right">
                    <p className="text-xl font-semibold">
                        Total: ₹
                        {apiData
                            .reduce((total, item) => total + item.prod_price * item.prod_quantity, 0)
                            .toFixed(2)}
                    </p>
                    <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
