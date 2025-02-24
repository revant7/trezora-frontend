import React from 'react';
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
                        <div className="relative group" key={item}>
                            <Link
                                to={item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`}
                                className="text-white text-lg font-semibold hover:text-red-500 transition duration-200 whitespace-nowrap"
                            >
                                {item}
                            </Link>
                            {/* Underline for the navigation link */}
                            <div className="absolute bottom-0 top-3 left-0 w-full h-2 bg-red-500 hidden group-hover:block mt-[20px]"></div>
                        </div>
                    ))}
                </div>

                {/* Cart Section */}
                <div className="relative flex items-center ml-2">
                    <Link to="/cart" className="relative">
                        {/* SVG Cart Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-10 h-10 hover:text-red-500 transition"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.084.835l.383 1.438m0 0L6.75 13.5h10.5l1.647-6.177a1.125 1.125 0 00-1.084-1.448H5.103m0 0L4.5 5.25m13.5 12a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-9 0a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
                            />
                        </svg>

                        {/* Cart item count badge */}
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            5
                        </span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
