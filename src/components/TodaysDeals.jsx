import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateCartCountContext from "../context/UpdateCartCount";

const TodaysDeals = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { setCartCount } = useContext(UpdateCartCountContext);

  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [dealsEndTime, setDealsEndTime] = useState(null);

  // Function to fetch deals from backend API
  const fetchDealsFromAPI = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/get-daily-deals/`);

      if (response.data.success && response.data.deals) {
        const apiDeals = response.data.deals.map(dealData => ({
          ...dealData.product,
          originalPrice: dealData.original_price,
          discountedPrice: dealData.discounted_price,
          discountPercentage: dealData.discount_percentage,
          dealId: dealData.id,
          dealEnd: dealData.deal_end,
          timeLeft: dealData.time_left
        }));

        setDeals(apiDeals);

        // Set the next refresh time if available
        if (response.data.next_refresh) {
          const nextRefreshTime = new Date(response.data.next_refresh).getTime();
          setDealsEndTime(nextRefreshTime);
          setTimeLeft(nextRefreshTime - Date.now());
        }

        // Store deals in localStorage for caching
        const dealsData = {
          deals: apiDeals,
          generatedAt: Date.now(),
          expiresAt: response.data.next_refresh ? new Date(response.data.next_refresh).getTime() : Date.now() + (24 * 60 * 60 * 1000),
          fromAPI: true
        };
        localStorage.setItem('todaysDeals', JSON.stringify(dealsData));
      } else {
        console.warn('No deals available from API');
        setDeals([]);
      }
    } catch (error) {
      console.error('Error fetching deals from API:', error);
      // Fall back to cached deals if API fails
      await loadCachedDeals();
    } finally {
      setLoading(false);
    }
  };

  // Function to load deals from cache (fallback)
  const loadCachedDeals = async () => {
    const storedDeals = localStorage.getItem('todaysDeals');

    if (storedDeals) {
      const dealsData = JSON.parse(storedDeals);
      const now = Date.now();

      // Check if deals have expired (24 hours)
      if (now < dealsData.expiresAt) {
        setDeals(dealsData.deals);
        setDealsEndTime(dealsData.expiresAt);
        setTimeLeft(dealsData.expiresAt - now);
        return true;
      }
    }
    return false;
  };

  // Function to load deals (try API first, fall back to cache)
  const loadDeals = async () => {
    // Try to load from cache first for faster loading
    const cachedLoaded = await loadCachedDeals();

    if (!cachedLoaded) {
      // No valid cache, fetch from API
      await fetchDealsFromAPI();
    } else {
      // We have cached deals, but still fetch fresh data in background
      fetchDealsFromAPI();
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (dealsEndTime) {
      const countdownInterval = setInterval(() => {
        const timeRemaining = dealsEndTime - Date.now();
        setTimeLeft(timeRemaining);

        // If countdown ends, fetch new deals from API
        if (timeRemaining <= 0) {
          clearInterval(countdownInterval);
          fetchDealsFromAPI();
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [dealsEndTime]);

  const addToCart = async (productId) => {
    const user = localStorage.getItem('accessToken');
    if (!user) {
      navigate('/sign-in', { replace: true });
      return;
    }

    try {
      const data = {
        unique_id: productId,
        quantity: 1,
      };
      await axios.post(`${API_URL}/api/add-item-to-cart/`, data, {
        headers: { Authorization: `Bearer ${user}` }
      });

      // Update cart count
      const cartResponse = await axios.get(`${API_URL}/api/get-cart-items/`, {
        headers: { Authorization: `Bearer ${user}` }
      });
      setCartCount(cartResponse.data.length);

    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Convert time left to days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-lg font-semibold text-neutral-600">Loading today's hottest deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6 pt-12">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
            <h2 className="text-5xl font-bold gradient-text">
              Today's Deals
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"></div>
          </div>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-6">
            Flash deals that change every 24 hours! Don't miss out on these amazing limited-time offers
          </p>

          {/* Global Countdown Timer */}
          <div className="inline-flex items-center gap-4 p-4 glassmorphism bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200/50 shadow-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-red-700">Deals Reset In:</span>
            </div>
            <div className="flex items-center gap-2 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 min-w-[50px]">
                <div className="text-lg font-bold text-red-600">{days}</div>
                <div className="text-xs text-neutral-500">Days</div>
              </div>
              <span className="text-red-500 font-bold">:</span>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 min-w-[50px]">
                <div className="text-lg font-bold text-red-600">{hours}</div>
                <div className="text-xs text-neutral-500">Hours</div>
              </div>
              <span className="text-red-500 font-bold">:</span>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 min-w-[50px]">
                <div className="text-lg font-bold text-red-600">{minutes}</div>
                <div className="text-xs text-neutral-500">Min</div>
              </div>
              <span className="text-red-500 font-bold">:</span>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 min-w-[50px]">
                <div className="text-lg font-bold text-red-600">{seconds}</div>
                <div className="text-xs text-neutral-500">Sec</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        {deals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {deals.map((deal, index) => (
              <div
                key={deal.dealId}
                className="group glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl shadow-medium hover:shadow-large smooth-transition overflow-hidden border border-white/50 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Deal Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-medium animate-pulse-subtle">
                    {deal.discountPercentage}% OFF 🔥
                  </span>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 cursor-pointer" onClick={() => navigate(`/product/${deal.unique_id}`)}>
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-bold text-neutral-800 group-hover:text-primary-600 smooth-transition line-clamp-2 cursor-pointer" onClick={() => navigate(`/product/${deal.unique_id}`)}>
                    {deal.name}
                  </h3>

                  {/* Brand */}
                  {deal.brand && (
                    <p className="text-xs text-neutral-500 font-medium">{deal.brand}</p>
                  )}

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-success-600">
                        ₹{deal.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-neutral-400 line-through">
                        ₹{deal.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2 py-1 bg-success-100 text-success-700 text-xs font-bold rounded-full">
                        SAVE ₹{(deal.originalPrice - deal.discountedPrice).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <svg className="w-3 h-3 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.91l6.567-.955L10 1l2.945 5.955 6.567.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        <span>{deal.product_rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(deal.unique_id)}
                      className="py-2 px-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold rounded-lg shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-105 active:scale-95"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/product/${deal.unique_id}`)}
                      className="py-2 px-3 bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-gradient-to-r hover:from-neutral-200 hover:to-neutral-300 smooth-transition hover:scale-105 active:scale-95"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-700 mb-2">No Deals Available</h3>
            <p className="text-neutral-500">Check back later for amazing deals!</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              ⚡ Limited Time Flash Deals
            </h3>
            <p className="text-neutral-600 mb-6">
              New deals every 24 hours! These exclusive discounts are automatically refreshed with fresh products and surprise savings.
            </p>
            <div className="flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-105"
              >
                Explore All Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysDeals;
