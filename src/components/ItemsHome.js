import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function ItemsHome() {
    const [apiData, setApiData] = useState([]);
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1NTA4MjkwLCJpYXQiOjE3Mzk5NTYyOTAsImp0aSI6IjA1MjE1NDcwNGEwMzQ1ZjE4Y2IyMDUwOTFlZmJjNGE1IiwidXNlcl9pZCI6MX0.VUevWFFbJe8kNh1v4T90s7gSReFhxi8qZfdYQLoTpxE";
    const headers = { "Authorization": `Bearer ${accessToken}` }

    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/amazon/get-data/", {
            headers: headers
        }).then(response => setApiData(response.data)).catch(error => console.error('Error:', error));

    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {
                apiData.map((item) => (

                    <div className="max-w-xs bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img
                            src={item.mainImage}
                            alt="Product Image"
                            className="rounded-t-lg w-full h-48 object-cover"
                            height="150px"
                            width="150px"
                        />
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{item.productType}</h3>
                            <p className="text-gray-600 text-sm mb-3">{item.item_name}</p>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-green-600">₹{item.b2c_price}</span>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.567-.955L10 1l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                                    </svg>
                                    <span className="ml-1 text-sm text-gray-700">4.5</span>
                                </div>
                            </div>

                            <button
                                className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-md"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                ))

            }
        </div>

    )
}
