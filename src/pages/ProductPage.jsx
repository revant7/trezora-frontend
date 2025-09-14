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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-lg font-semibold text-neutral-600">Loading amazing product...</p>
        </div>
      </div>
    );
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

  // Navigate to Wishlist Page
  const goToWishlist = () => {
    navigate("/wishlist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 glassmorphism backdrop-blur-xl rounded-3xl shadow-large p-8 md:p-12 border border-white/50">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Section: Image & Zoom */}
            <div className="space-y-6">

              {/* Main Product Image */}
              <div className="relative group">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 shadow-medium">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain cursor-crosshair p-8 transition-transform duration-500 group-hover:scale-105"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  />

                  {/* Zoom indicator */}
                  <div className="absolute top-4 left-4 px-3 py-2 glassmorphism bg-white/90 backdrop-blur-sm rounded-full shadow-soft opacity-0 group-hover:opacity-100 smooth-transition">
                    <span className="text-xs font-medium text-neutral-600">Hover to zoom</span>
                  </div>
                </div>

                {/* Wishlist Button */}
                <button
                  className={`absolute top-4 right-4 w-12 h-12 rounded-full glassmorphism backdrop-blur-lg shadow-medium smooth-transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-300 ${wishlist
                    ? "bg-error-500/20 text-error-500 hover:bg-error-500/30"
                    : "bg-white/20 text-neutral-400 hover:bg-white/30 hover:text-error-400"
                    }`}
                  onClick={toggleWishlist}
                >
                  <svg className="w-6 h-6 mx-auto" fill={wishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Zoom Box */}
              <div
                className="hidden lg:block w-full aspect-square border-2 border-neutral-200 overflow-hidden rounded-2xl shadow-large bg-white"
                style={{ ...zoomStyle }}
              />
            </div>

            {/* Right Section: Product Details */}
            <div className="space-y-8">

              {/* Category Badge */}
              <div className="inline-flex px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold rounded-full shadow-medium">
                {product.product_category[0]}
              </div>

              {/* Product Title & Brand */}
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-neutral-800 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xl text-neutral-600 font-medium">
                  by <span className="text-primary-600">{product.brand}</span>
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-2 bg-warning-50 border border-warning-200 rounded-xl">
                  <svg className="w-5 h-5 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.567-.955L10 1l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                  <span className="text-lg font-bold text-warning-700">{product.product_rating}/5</span>
                </div>
                <span className="text-neutral-500">Based on customer reviews</span>
              </div>

              {/* Pricing */}
              <div className="space-y-3 p-6 glassmorphism bg-gradient-to-r from-success-50 to-primary-50 rounded-2xl border border-success-200">
                <div className="flex items-end gap-4">
                  <span className="text-4xl font-bold text-success-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <>
                      <span className="text-xl text-neutral-400 line-through">
                        ₹{product.mrp.toLocaleString()}
                      </span>
                      <span className="text-sm font-bold px-3 py-1 bg-success-100 text-success-700 rounded-full">
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-success-600 font-medium">Inclusive of all taxes</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${product.quantity > 0 ? 'bg-success-500' : 'bg-error-500'}`} />
                <span className={`font-semibold ${product.quantity > 0 ? 'text-success-600' : 'text-error-600'}`}>
                  {product.quantity > 0 ? `In Stock (${product.quantity} available)` : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selection */}
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-neutral-700">Quantity</label>
                <select className="px-4 py-3 border-2 border-neutral-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition text-lg font-medium">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className="py-4 px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
                  disabled={product.quantity === 0}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18" />
                    </svg>
                    Add to Cart
                  </span>
                </button>

                <button
                  className="py-4 px-6 bg-gradient-to-r from-accent-600 to-primary-600 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2"
                  disabled={product.quantity === 0}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Buy Now
                  </span>
                </button>
              </div>

              {/* Product Description */}
              <div className="space-y-4 p-6 glassmorphism bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-800">Product Description</h3>
                <p className="text-neutral-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features or Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 text-center glassmorphism bg-white/50 backdrop-blur-sm rounded-xl border border-neutral-200">
                  <div className="w-8 h-8 mx-auto mb-2 text-primary-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">Quality Assured</p>
                </div>

                <div className="p-4 text-center glassmorphism bg-white/50 backdrop-blur-sm rounded-xl border border-neutral-200">
                  <div className="w-8 h-8 mx-auto mb-2 text-primary-500">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-neutral-700">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


