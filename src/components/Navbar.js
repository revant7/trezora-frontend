import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const navComponents = ["Home", "Today's Deals", "Sign In", "Create Account", "Orders", "Wish List", "Contact Us"];
    const location = useLocation();

    const getActiveLinkClass = (item) => {
        const path = item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`;
        return location.pathname === path
            ? "text-yellow-400 underline underline-offset-4"
            : "text-white";
    };

    return (
        <div className="mb-2 shadow-lg">
            <nav className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-2">
                {/* Logo Section */}
                <div className="flex items-center gap-1">
                    <span className="text-white font-extrabold text-2xl tracking-wide">Trez</span>
                    <img className="bg-transparent" src="/images/finalshoplogo.ico" alt="logo" width="40" height="40" />
                    <span className="text-white font-extrabold text-2xl tracking-wide">ra</span>
                </div>

                {/* User Location */}
                <div className="hidden lg:flex flex-col text-white text-xs text-center px-4">
                    <span className="font-semibold">Deliver to</span>
                    <span className="font-light">New Delhi, 110091</span>
                </div>

                {/* Search Bar */}
                <div className="flex items-center bg-white rounded-full shadow-inner px-3 w-full max-w-sm">
                    <input
                        type="text"
                        className="w-full px-3 py-1 text-sm focus:outline-none rounded-l-full"
                        placeholder="Search for products..."
                    />
                    <span className="p-2 cursor-pointer hover:bg-gray-200 rounded-full transition">
                        <img src="/images/search.jpg" width="18" height="18" alt="search" />
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-4 px-4">
                    {navComponents.map((item) => (
                        <Link
                            key={item}
                            to={item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`}
                            className={`text-sm font-semibold whitespace-nowrap transition-all duration-200 ease-in-out hover:text-yellow-300 hover:scale-105 ${getActiveLinkClass(item)}`}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Cart Section */}
                <div className="relative flex items-center ml-2">
                    <Link to="/cart" className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-9 h-9 hover:text-yellow-300 transition-transform transform hover:scale-110"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.084.835l.383 1.438m0 0L6.75 13.5h10.5l1.647-6.177a1.125 1.125 0 00-1.084-1.448H5.103m0 0L4.5 5.25m13.5 12a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zm-9 0a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z"
                            />
                        </svg>

                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                            5
                        </span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
