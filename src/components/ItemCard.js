import React from 'react'

export default function ItemCard({ name, image, product_type, price, addToCart }) {
    return (
        <div className="max-w-xs bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img
                src={image}
                alt={name}
                className="rounded-t-lg w-full h-48 object-cover"
                height="150px"
                width="150px"
            />
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product_type}</h3>
                <p className="text-gray-600 text-sm mb-3">{name}</p>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-green-600">₹{price}</span>
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.567-.955L10 1l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-700">4.5</span>
                    </div>
                </div>

                <button
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-md" onClick={addToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
