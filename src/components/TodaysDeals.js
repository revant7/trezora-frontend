import React, { useState, useEffect } from 'react';

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
    <div className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Today's Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={deal.imgSrc}
                alt={deal.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{deal.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-gray-600 line-through">{deal.price}</span>
                  <span className="text-xl font-bold text-green-500">{deal.discountedPrice}</span>
                </div>
                <div className="text-center px-[10px]  max-w-lg mx-auto text-red-600  ">
                  <p className="py-3 text-black text-lg">Offer Ends in:</p>
                  <div className="font-bold  bg-gray-300 rounded-md">
                    <span className="inline-block mx-1 text-blue-500">{days}</span> Days
                    <span className="inline-block mx-1  text-blue-500">{hours}</span> Hours
                    <span className="inline-block mx-1  text-blue-500">{minutes}</span> Minutes
                    <span className="inline-block mx-1  text-blue-500">{seconds}</span> Seconds
                  </div>
                </div>
                <a
                  href={deal.link}
                  className="mt-4 block text-center text-white bg-blue-500 p-2 rounded-md"
                >
                  Shop Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaysDeals;
