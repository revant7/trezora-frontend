import React from 'react';

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
