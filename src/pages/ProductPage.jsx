import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateCartCountContext from "../context/UpdateCartCount";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const { setCartCount } = useContext(UpdateCartCountContext);

  const [product, setProduct] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
    checkWishlistStatus();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/get-product-by-id/${productId}/`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const checkWishlistStatus = async () => {
    const user = localStorage.getItem('accessToken');
    if (user) {
      try {
        const response = await axios.get(`${API_URL}/api/get-wishlist/`, {
          headers: { Authorization: `Bearer ${user}` }
        });
        const wishlistItems = response.data;
        const isProductInWishlist = wishlistItems.some(item => item.product.unique_id === productId);
        setIsInWishlist(isProductInWishlist);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    }
  };

  const toggleWishlist = async () => {
    const user = localStorage.getItem('accessToken');
    if (!user) {
      navigate('/sign-in', { replace: true });
      return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(`${API_URL}/api/remove-from-wishlist/`, {
          headers: { Authorization: `Bearer ${user}` },
          data: { unique_id: productId }
        });
        setIsInWishlist(false);
      } else {
        // Add to wishlist
        await axios.post(`${API_URL}/api/add-to-wishlist/`,
          { unique_id: productId },
          { headers: { Authorization: `Bearer ${user}` } }
        );
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const addToCart = async () => {
    const user = localStorage.getItem('accessToken');
    if (!user) {
      navigate('/sign-in', { replace: true });
      return;
    }

    setCartLoading(true);
    try {
      const data = {
        unique_id: productId,
        quantity: quantity,
      }
      await axios.post(`${API_URL}/api/add-item-to-cart/`, data, {
        headers: { Authorization: `Bearer ${user}` }
      });

      // Update cart count
      const cartResponse = await axios.get(`${API_URL}/api/get-cart-items/`, {
        headers: { Authorization: `Bearer ${user}` }
      });
      setCartCount(cartResponse.data.length);

      // Show success message or redirect to cart
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart. Please try again.');
    } finally {
      setCartLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 glassmorphism backdrop-blur-xl rounded-3xl shadow-large p-8 md:p-12 border border-white/50">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Section: Image & Zoom */}
            <div className="relative">

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
                  className={`absolute top-4 right-4 w-12 h-12 rounded-full glassmorphism backdrop-blur-lg shadow-medium smooth-transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed ${isInWishlist
                    ? "bg-red-500/90 text-white hover:bg-red-600/90"
                    : "bg-white/90 text-neutral-600 hover:bg-red-50 hover:text-red-500"
                    }`}
                  onClick={toggleWishlist}
                  disabled={wishlistLoading}
                >
                  {wishlistLoading ? (
                    <svg className="w-5 h-5 mx-auto animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg
                      className={`w-6 h-6 mx-auto smooth-transition ${isInWishlist ? 'scale-110' : ''}`}
                      fill={isInWishlist ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={isInWishlist ? 0 : 2}
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Zoom Box - Positioned absolutely to the right */}
              <div
                className="hidden xl:block absolute top-0 left-full ml-6 w-96 h-96 border-2 border-neutral-200 overflow-hidden rounded-2xl shadow-large bg-white z-10"
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
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="px-4 py-3 border-2 border-neutral-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition text-lg font-medium"
                >
                  {[...Array(Math.min(product.quantity, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    className="py-4 px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.quantity === 0 || cartLoading}
                    onClick={addToCart}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {cartLoading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Adding...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18" />
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </span>
                  </button>

                  <button
                    className="py-4 px-6 bg-gradient-to-r from-accent-600 to-primary-600 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.quantity === 0}
                    onClick={() => {
                      addToCart();
                      setTimeout(() => navigate('/checkout'), 1000);
                    }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Buy Now
                    </span>
                  </button>
                </div>

                {/* Wishlist Status */}
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isInWishlist ? 'bg-red-500' : 'bg-neutral-300'}`}></div>
                  <span className="text-sm text-neutral-600">
                    {isInWishlist ? 'Added to wishlist' : 'Not in wishlist'}
                  </span>
                  <button
                    onClick={() => navigate('/wishlist')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium underline smooth-transition ml-2"
                  >
                    View Wishlist
                  </button>
                </div>
              </div>

              {/* Product Description */}
              <div className="space-y-6 p-8 glassmorphism bg-gradient-to-br from-white/80 to-neutral-50/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-large">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-neutral-800">Product Details</h3>
                </div>
                <p className="text-neutral-700 leading-relaxed text-lg">
                  {product.description}
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-neutral-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800">Quality Assured</div>
                      <div className="text-sm text-neutral-600">Premium materials used</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-neutral-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800">Fast Shipping</div>
                      <div className="text-sm text-neutral-600">Express delivery available</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-neutral-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800">Warranty</div>
                      <div className="text-sm text-neutral-600">1 year manufacturer warranty</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-neutral-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800">Easy Returns</div>
                      <div className="text-sm text-neutral-600">30-day return policy</div>
                    </div>
                  </div>
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


