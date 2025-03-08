import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

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

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Image Section */}
          <div
            className="relative w-full h-96 overflow-hidden rounded-lg border shadow-lg bg-gray-200 group"
            onMouseMove={handleMouseMove}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            ></div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover opacity-0"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-600 mt-2 text-lg">Brand: {product.brand}</p>

            {/* Pricing */}
            <div className="mt-4">
              <p className="text-3xl font-semibold text-blue-600">₹{product.price}</p>
              <p className="text-gray-500 line-through text-lg">MRP: ₹{product.mrp}</p>
            </div>

            {/* Ratings */}
            <p className="mt-3 text-yellow-500 text-lg font-semibold">
              ⭐ {product.product_rating}/5
            </p>

            {/* Description */}
            <p className="text-gray-700 mt-4 leading-relaxed">{product.description}</p>

            {/* Stock Information */}
            <p className={`mt-2 font-semibold ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.quantity > 0 ? `In Stock: ${product.quantity} available` : "Out of Stock"}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition duration-300">
                Add to Cart 🛒
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-lg shadow-md transition duration-300">
                Buy Now ⚡
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
