import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
    const [cartData, setCartData] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null); // Added for better error handling
    const navigate = useNavigate();


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
            setCartData(response.data);

        }
    }, [navigate]);



    const getProfileDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/get-profile-details/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            setApiData(response.data);
        } catch (error) {
            console.error("Error fetching profile details:", error);
            setError("Failed to load profile details");
        }
    };

    const subtotal = cartData.reduce((acc, item) => acc + item.prod_price * item.prod_quantity, 0);
    const tax = subtotal * 0.1;
    const deliverycharge = subtotal >= 500 ? 0 : 50;
    const total = subtotal + tax + deliverycharge;

    const CompleteOrder = async () => {
        const user = localStorage.getItem('accessToken');
        if (!user) {
            navigate('/sign-in', { replace: true })

        } else {
            const response = await axios.post(`${API_URL}/api/post-orders/`, { order_data: cartData }, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            });
            navigate('/orders', { replace: true })


        }
    };


    useEffect(() => {
        fetchData();
    }, [fetchData])

    useEffect(() => {
        getProfileDetails();
    }, []);

    return (
        <div className="p-5">
            <h1 className="flex justify-center text-4xl font-bold bg-gray-100 p-4">Checkout</h1>
            <div className="grid grid-cols-2 gap-4 justify-center items-center py-[40px]">
                <div className="bg-gray-500 p-5 text-white rounded-lg">
                    <div className="bg-gray-200 text-black rounded-md mr-2">
                        <h2 className="text-xl font-bold">
                            Delivering to {apiData === null ? "Loading..." : apiData.first_name}
                        </h2>
                        {apiData === null ? (
                            "Loading..."
                        ) : !apiData?.address?.address ? (
                            <>
                                <p className="text-red-600">
                                    Please update your complete address in your profile section before completing your order.
                                </p>
                                <p>No address provided</p>
                            </>
                        ) : (
                            <p>{apiData.address.address}, {apiData.address.city}, {apiData.address.state}, {apiData.address.pincode}, India</p>
                        )}

                    </div>
                    {/* Payments Section */}
                    <div className="bg-gray-200 p-3 rounded-lg mt-5 text-black h-auto">
                        <h2 className="font-bold text-2xl">Payments</h2>
                        <div className="flex flex-col mt-2 space-y-2">
                            {/* UPI, Amazon Pay, Google Pay */}
                            <div className="flex items-center">
                                <h1 className="font-bold">Pay Through UPI</h1>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="amazonpay"
                                    name="payment"
                                    className="mr-2 mx-[30px]"
                                    onChange={() => setPaymentMethod("amazonpay")}
                                />
                                <label htmlFor="amazonpay">Amazon Pay</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="googlepay"
                                    name="payment"
                                    className="mr-2 mx-[30px]"
                                    onChange={() => setPaymentMethod("googlepay")}
                                />
                                <label htmlFor="googlepay">Google Pay</label>
                            </div>

                            {/* Debit or Credit Card Section */}
                            <h2 className="font-bold mt-3">Debit or Credit Card</h2>
                            <div className="flex flex-col mt-2 space-y-2 pl-5">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="visa"
                                        name="payment"
                                        className="mr-2"
                                        onChange={() => setPaymentMethod("visa")}
                                    />
                                    <label htmlFor="visa">Visa</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="mastercard"
                                        name="payment"
                                        className="mr-2"
                                        onChange={() => setPaymentMethod("mastercard")}
                                    />
                                    <label htmlFor="mastercard">Mastercard</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="rupay"
                                        name="payment"
                                        className="mr-2"
                                        onChange={() => setPaymentMethod("rupay")}
                                    />
                                    <label htmlFor="rupay">RuPay</label>
                                </div>
                                <div>
                                    <h1 className="font-bold">Another Payment Option</h1>
                                    <div>
                                        <input type="radio" id="net banking" name="payment" className="mr-2" />
                                        <label htmlFor="net banking">Net Banking</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="emi" name="payment" className="mr-2" />
                                        <label htmlFor="emi">EMI</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="cash" name="payment" className="mr-2" />
                                        <label htmlFor="cash">Cash On Delivery</label>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 p-5 text-black w-[430px] h-[400px] rounded-lg mx-auto">
                    <hr className="my-3" />
                    <div className="bg-gray-200 p-5 text-black w-[400px] rounded-lg">
                        <h2 className="text-xl font-bold">Order Summary</h2>
                        <div className="flex justify-between">
                            <span>Items:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (10%):</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Charge:</span>
                            <span>₹{deliverycharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-center py-[30px]'>
                            <button className='bg-yellow-500 w-[450px] h-[40px] rounded-[300px] text-xl font-bold' disabled={apiData === null || !apiData?.address?.address} onClick={
                                CompleteOrder
                            }>Complete Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}