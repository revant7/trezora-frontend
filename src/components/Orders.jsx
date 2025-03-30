import axios from "axios";
import React, { useEffect, useState } from "react";

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
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">📄 Your Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-600">You have no orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.order_id}
                            className="bg-white p-5 rounded-lg shadow-md"
                        >
                            <div className="flex justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">Order #{order.order_id}</h3>
                                    <p className="text-gray-500">
                                        Date: {order.order_date} | Time: {order.order_time}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-700 font-medium">
                                        Expected Delivery: {order.order_status}
                                    </p>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                {order.order_items.map((item) => (
                                    <li
                                        key={item.product_id}
                                        className="flex justify-between items-center border-t pt-3"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.product_image}
                                                alt={item.product_name}
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                            <div>
                                                <h4 className="font-medium">{item.product_name}</h4>
                                                <p className="text-gray-500">
                                                    ₹{item.product_price}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-gray-700">Qty: {item.product_quantity}</span>
                                    </li>

                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
