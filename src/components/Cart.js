import React from "react";

const Cart = ({ cartItems, handleRemoveFromCart }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Qty: {item.quantity}</span>
                                <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cartItems.length > 0 && (
                <div className="mt-6 text-right">
                    <p className="text-xl font-semibold">
                        Total: ₹
                        {cartItems
                            .reduce((total, item) => total + item.price * item.quantity, 0)
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
