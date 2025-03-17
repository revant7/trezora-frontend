import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [wishlist, setWishlist] = useState(false); // Wishlist state

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/get-product-by-id/${productId}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

  if (!product) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading...</div>;
  }

  // Handle zoom effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      backgroundImage: `url(${product.image})`,
      backgroundSize: "180%",
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  // Wishlist toggle function
  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full h-full bg-white shadow-xl p-10 flex flex-col md:flex-row gap-10">

        {/* Left Section: Image & Zoom Box */}
        <div className="w-full md:w-1/2 flex flex-col items-center relative">
          {/* Wishlist Heart Icon (Top Right of Image) */}
          <button
            className={`absolute bottom-[350px;] right-5 text-4xl transition duration-300 ${wishlist ? "text-red-600" : "text-gray-400"}`}
            onClick={toggleWishlist}
          >
            {wishlist ? "❤️" : "🤍"}
          </button>

          <div className="relative w-full h-[500px] overflow-hidden rounded-lg border shadow-lg bg-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left relative">

          {/* Zoom Box */}
          <div
            className="absolute left-0 top-0 bottom-1 w-[450px] h-[450px] border-2 border-gray-300 overflow-hidden rounded-lg shadow-lg bg-white z-10"
            style={{ ...zoomStyle }}
          ></div>
          <h4 className="text-xl font-medium text-gray-900">{product.product_category[0]}</h4>
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-gray-600 mt-2 text-2xl">Brand: {product.brand}</p>

          {/* Pricing */}
          <div className="mt-4">
            <p className="text-4xl font-semibold text-blue-600">₹{product.price}</p>
            <p className="text-gray-500 line-through text-2xl">MRP: ₹{product.mrp}</p>
          </div>

          {/* Ratings */}
          <p className="mt-3 text-yellow-500 text-3xl font-semibold">
            ⭐ {product.product_rating}/5
          </p>

          {/* Description */}
          <p className="text-gray-700 mt-10 text-xl leading-relaxed relative z-0">{product.description}</p>

          {/* Stock Information */}
          <p className={`mt-2 text-2xl font-semibold ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
            {product.quantity > 0 ? `In Stock: ${product.quantity} available` : "Out of Stock"}
          </p>

          {/* Quantity Selection */}
          <div className="mt-4">
            <label className="block text-indigo-700 text-xl font-bold mb-2"> Quantity </label>
            <select className="w-32 border-2 border-black rounded-lg text-center">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-2xl px-8 py-4 rounded-lg shadow-md transition duration-300">
              Add to Cart 🛒
            </button>
            <button className="flex-1 bg-gradient-to-r from-blue-800 to bg-purple-600 text-white text-2xl px-8 py-4 rounded-lg shadow-md transition duration-300">
              Buy Now ⚡
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;

