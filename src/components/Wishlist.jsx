import React from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          wishlist.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-medium">{item.name}</h3>
              <p className="text-gray-500">₹{item.price}</p>
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover mt-4" />
            </div>
          ))
        )}
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;


