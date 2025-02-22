import React from 'react'
import { Link } from 'react-router-dom';



export default function Navbar() {
    const navComponents = ["Home", "Today's Deals", "Sign In", "Create Account", "Orders", "Wish List", "Contact Us"];
    return (
        <div className="mb-2 shadow-md">
            <nav className="flex items-center justify-between bg-blue-500 px-6 py-3">
                {/* Logo Section */}
                <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-2xl">Trez</span>
                    <img className="bg-transparent" src="/images/finalshoplogo.ico" alt="logo" width="50" height="50" />
                    <span className="text-white font-bold text-2xl">ra</span>
                </div>

                {/* User Location */}
                <div className="hidden lg:flex flex-col text-white text-sm text-center px-4">
                    <span className="font-semibold">Deliver to</span>
                    <span className="font-light">New Delhi, 110091</span>
                </div>

                {/* Search Bar */}
                <div className="flex items-center bg-white rounded-lg shadow-inner px-2 w-full max-w-md">
                    <input
                        type="text"
                        className="w-full px-3 py-2 text-sm focus:outline-none rounded-l-lg"
                        placeholder="Search..."
                    />
                    <span className="p-2 cursor-pointer hover:bg-gray-200 rounded-r-lg transition">
                        <img src="/images/search.jpg" width="20" height="20" alt="search" />
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-5 px-4">
                    {navComponents.map((item) => (
                        <Link
                            key={item}
                            to={item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`}
                            className="text-white text-sm font-semibold hover:text-yellow-300 transition duration-200"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Cart Section */}
                <div className="relative flex items-center ml-4">
                    <Link>
                        <i className="fa-solid fa-cart-shopping fa-2x"></i>
                    </Link>
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        5
                    </span>
                </div>
            </nav>
        </div>
    )
}