import React from 'react';
import { Link } from 'react-router-dom';

export default function Catagory() {
    const catagories = [
        "Home Appliances",
        "Kitchen Appliances",
        "Laptops",
        "Mobile Phones",
        "Tablets",
        "Smart Watches",
        "Headphones",
        "Accessories"
    ];

    return (
        <div className="flex flex-wrap gap-6 px-6 py-8 justify-center items-center">
            {catagories.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-28">
                    <Link to={`/catagory/${item.toLowerCase().replace(/ /g, "-")}`} className="flex flex-col items-center group">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-300 overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-110">
                            <img
                                src={`/images/${item.replace(/ /g, "_")}.ico`}
                                alt={item}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors">
                            {item}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    );
}
