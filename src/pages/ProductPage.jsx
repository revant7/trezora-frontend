import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/get-product-by-id/${productId}/`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]);

  if (!product) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading...</div>;
  }

  // Add product to wishlist
  const addToWishlist = () => {
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);
    if (!isAlreadyInWishlist) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  // Navigate to Wishlist Page
  const goToWishlist = () => {
    navigate("/wishlist");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full h-full bg-white shadow-xl p-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 flex flex-col items-center relative">
          <button
            className={`absolute top-5 right-5 text-4xl transition duration-300 ${
              wishlist.some((item) => item.id === product.id)
                ? "text-red-600"
                : "text-gray-400"
            }`}
            onClick={addToWishlist}
          >
            {wishlist.some((item) => item.id === product.id) ? "❤️" : "🤍"}
          </button>

          <div className="relative w-full h-[500px] overflow-hidden rounded-lg border shadow-lg bg-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain cursor-crosshair"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h4 className="text-xl font-medium text-gray-900">{product.product_category[0]}</h4>
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-600 mt-2 text-2xl">Brand: {product.brand}</p>

          <div className="mt-4">
            <p className="text-4xl font-semibold text-blue-600">₹{product.price}</p>
            <p className="text-gray-500 line-through text-2xl">MRP: ₹{product.mrp}</p>
          </div>

          <p className="mt-3 text-yellow-500 text-3xl font-semibold">
            ⭐ {product.product_rating}/5
          </p>

          <p className="text-gray-700 mt-10 text-xl leading-relaxed">{product.description}</p>

          <p className={`mt-2 text-2xl font-semibold ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
            {product.quantity > 0 ? `In Stock: ${product.quantity} available` : "Out of Stock"}
          </p>

          <div className="mt-4">
            <label className="block text-indigo-700 text-xl font-bold mb-2">Quantity</label>
            <select className="w-32 border-2 border-black rounded-lg text-center">
              {[1, 2, 3, 4].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-2xl px-8 py-4 rounded-lg shadow-md transition duration-300">
              Add to Cart 🛒
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-blue-800 to bg-purple-600 text-white text-2xl px-8 py-4 rounded-lg shadow-md transition duration-300"
              onClick={goToWishlist}
            >
              Go to Wishlist ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


