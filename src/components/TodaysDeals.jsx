import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TodaysDeals = () => {
  const deals = [
    {
      title: 'Smartphone - 30% Off',
      price: '₹22,900',
      discountedPrice: '₹16,030',
      imgSrc: '/images/samsung.jpg',
      link: '#',
    },
    {
      title: 'Wireless Headphones',
      price: '₹1700',
      discountedPrice: '₹1300',
      imgSrc: '/images/headphone.jpg',
      link: '#',
    },
    {
      title: 'Smartwatch - 40% Off',
      price: '₹3000',
      discountedPrice: '₹1800',
      imgSrc: '/images/watches.jpg',
      link: '#',
    },
  ];

  // Set the offer end date
  const offerEndDate = new Date("Mar 1, 2025 00:00:00").getTime();

  // State to store time left
  const [timeLeft, setTimeLeft] = useState(offerEndDate - Date.now());

  useEffect(() => {
    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      const timeRemaining = offerEndDate - Date.now();
      setTimeLeft(timeRemaining);

      // If the countdown ends, clear the interval
      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    // Cleanup interval when the component unmounts
    return () => clearInterval(countdownInterval);
  }, [offerEndDate]);

  // Convert time left to days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold gradient-text mb-4">
            Today's Deals
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Don't miss out on these amazing limited-time offers
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="group glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl shadow-medium hover:shadow-large smooth-transition overflow-hidden border border-white/50 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Deal Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-gradient-to-r from-error-500 to-warning-500 text-white text-sm font-bold rounded-full shadow-medium animate-pulse-subtle">
                  HOT DEAL 🔥
                </span>
              </div>

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                <img
                  src={deal.imgSrc}
                  alt={deal.title}
                  className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-neutral-800 group-hover:text-primary-600 smooth-transition">
                  {deal.title}
                </h3>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-success-600">
                        {deal.discountedPrice}
                      </span>
                      <span className="text-lg text-neutral-400 line-through">
                        {deal.price}
                      </span>
                    </div>
                    <span className="inline-block px-2 py-1 bg-success-100 text-success-700 text-xs font-bold rounded-full">
                      SAVE BIG!
                    </span>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="p-4 glassmorphism bg-gradient-to-r from-error-50 to-warning-50 rounded-xl border border-error-200">
                  <p className="text-sm font-semibold text-neutral-700 mb-2 text-center">⏰ Offer Ends In:</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
                      <div className="text-lg font-bold text-error-600">{days}</div>
                      <div className="text-xs text-neutral-500">Days</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
                      <div className="text-lg font-bold text-error-600">{hours}</div>
                      <div className="text-xs text-neutral-500">Hours</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
                      <div className="text-lg font-bold text-error-600">{minutes}</div>
                      <div className="text-xs text-neutral-500">Min</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
                      <div className="text-lg font-bold text-error-600">{seconds}</div>
                      <div className="text-xs text-neutral-500">Sec</div>
                    </div>
                  </div>
                </div>

                {/* Shop Now Button */}
                <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2">
                  <span className="flex items-center justify-center gap-2">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glassmorphism bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              Don't Wait! Limited Time Offers
            </h3>
            <p className="text-neutral-600 mb-6">
              These exclusive deals won't last long. Grab them before they're gone!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-warning-500 to-error-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow smooth-transition hover:scale-105"
            >
              Explore More Deals
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysDeals;
