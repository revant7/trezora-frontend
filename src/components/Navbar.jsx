import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthenticationContext from '../context/AuthenticationContext';
import UpdateCartCountContext from '../context/UpdateCartCount';
import axios from 'axios';
import { MapPin, User, LogOut, Search } from 'lucide-react';

export default function Navbar() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext);
    const { cartCount, setCartCount } = useContext(UpdateCartCountContext);
    const [navComponents, setNavComponents] = useState([]);
    const [query, setQuery] = useState("");
    const [pincode, setPincode] = useState("Fetching...");
    const [village, setVillage] = useState("");
    const [district, setDistrict] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            setNavComponents(["Home", "Today's Deals", "Orders", "Wish List", "Contact Us"]);
        } else {
            setNavComponents(["Home", "Today's Deals", "Sign In", "Orders", "Wish List", "Contact Us"]);
        }
    }, [isAuthenticated]);


    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await axios.get(
                            `https://us1.locationiq.com/v1/reverse?key=pk.731d3ce8607b57b9811f86ee56c2bc1c&lat=${latitude}&lon=${longitude}&format=json`
                        );
                        const address = response.data.address;
                        if (address) {
                            if (address.postcode) {
                                setPincode(address.postcode);
                            }
                            if (address.village) {
                                setVillage(`${address.village}, `);
                            }
                            if (address.state_district) {
                                setDistrict(`${address.state_district}, `);
                            }
                        } else {
                            setPincode("Not Found");
                        }
                    } catch (error) {
                        console.error("Error fetching pincode:", error);
                        setPincode("Error");
                    }

                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setPincode("Location Disabled");
                }
            );
        } else {
            setPincode("Not Supported");
        }
    }, []);

    const handleSearchInputChange = async (e) => {
        const searchInputValue = e.target.value;
        setQuery(searchInputValue);

        if (searchInputValue.length > 2) {
            try {
                const searchSuggestionsResponse = await axios.get(`${API_URL}/api/autocomplete`, { params: { q: searchInputValue } });
                setSuggestions(searchSuggestionsResponse.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };



    const fetchCartCount = useCallback(async () => {
        const user = localStorage.getItem('accessToken');
        if (!user) {
            setCartCount(0);
            return false;

        } else {
            try {
                const response = await axios.get(`${API_URL}/api/get-cart-items-count`, { headers: { Authorization: `Bearer ${user}` } });
                setCartCount(response.data.count);
                return true;
            } catch (error) {
                console.error("Error fetching cart count:", error);
                return false;
            }

        }
    }, [setCartCount]);



    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchCartCount();
            if (!result) {
                // navigate('/sign-in', { replace: true });
                return;
            }
        };
        fetchData();

    }, [fetchCartCount, navigate])

    const getActiveLinkClass = (item) => {
        const path = item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`;
        return location.pathname === path
            ? "bg-primary-600 text-white shadow-md"
            : "text-neutral-700 hover:text-primary-600 hover:bg-neutral-100";
    };

    const handleProfileClick = () => navigate('/profile');

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Clear token
        setIsAuthenticated(false);              // Update context state
        navigate('/sign-in', { replace: true });  // Redirect to login
    };


    const handleSearch = async (e) => {
        if ((e.key === "Enter" || e.type === "click") && query.trim() !== "") {
            setSuggestions([]); // Clear suggestions when searching
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {/* Main Navbar */}
            <nav className="relative">
                {/* Background with gradient and blur */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 shadow-2xl"></div>
                <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>

                {/* Content */}
                <div className="relative flex items-center justify-between px-4 py-1 sm:py-2">

                    {/* Left Section - Logo */}
                    <div className="flex items-center group">
                        <div className="relative">
                            {/* Logo glow effect */}
                            <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 smooth-transition scale-110"></div>

                            {/* Logo container */}
                            <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 smooth-transition">
                                <div className="flex items-center gap-1">
                                    <span className="text-xl font-black text-white tracking-tight">Trez</span>
                                    <div className="relative">
                                        <img
                                            className="w-6 h-6 drop-shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]"
                                            src="/images/finalshoplogo.ico"
                                            alt="logo"
                                        />
                                        <div className="absolute inset-0 bg-accent-300/30 rounded-full blur-md opacity-0 group-hover:opacity-100 smooth-transition"></div>
                                    </div>
                                    <span className="text-xl font-black text-white tracking-tight">ra</span>
                                </div>
                                <div className="hidden md:block w-px h-4 bg-white/30"></div>
                                <div className="hidden md:flex flex-col">
                                    <span className="text-xs font-semibold text-white/90 leading-none">Modern</span>
                                    <span className="text-xs font-semibold text-accent-200 leading-none">Shopping</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Section - Search */}
                    <div className="flex-1 max-w-xl mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                        <div className="relative">
                            {/* Search container */}
                            <div className="relative flex items-center">
                                <div className="absolute inset-0 bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl md:rounded-2xl opacity-50"></div>

                                <div className="relative flex items-center w-full">
                                    {/* Search icon */}
                                    <div className="flex items-center pl-3 sm:pl-4 md:pl-6 pr-2 sm:pr-3">
                                        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                                    </div>

                                    {/* Input */}
                                    <input
                                        type="text"
                                        className="flex-1 py-2 sm:py-2.5 md:py-3 pr-2 sm:pr-3 md:pr-4 text-sm sm:text-base font-medium text-neutral-700 placeholder-neutral-400 bg-transparent focus:outline-none"
                                        placeholder="Search products..."
                                        value={query}
                                        onChange={handleSearchInputChange}
                                        onKeyDown={handleSearch}
                                    />

                                    {/* Search button */}
                                    <button
                                        onClick={handleSearch}
                                        className="mr-1 sm:mr-2 px-3 sm:px-4 md:px-6 py-1 sm:py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs sm:text-sm font-medium sm:font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-glow-purple smooth-transition hover:scale-105 active:scale-95"
                                    >
                                        <span className="hidden sm:inline">Search</span>
                                        <Search className="w-4 h-4 sm:hidden" />
                                    </button>
                                </div>
                            </div>

                            {/* Search Suggestions */}
                            {suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50 animate-fade-in-down">
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            className="w-full text-left px-6 py-3 text-neutral-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 smooth-transition border-b border-neutral-50 last:border-b-0"
                                            onClick={() => {
                                                setQuery(suggestion);
                                                setSuggestions([]);
                                                navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Search className="w-4 h-4 text-neutral-400" />
                                                <span className="font-medium">{suggestion}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-4">

                        {/* Location (Desktop only) */}
                        <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 smooth-transition relative group">
                            <MapPin className="w-5 h-5 text-accent-300" />
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-white/80">Deliver to</span>
                                <span className="text-sm font-bold text-white truncate max-w-24">{district || "Your Location"}</span>
                            </div>

                            {/* Tooltip with full location on hover */}
                            {(village || district || pincode !== "Fetching..." && pincode !== "Error" && pincode !== "Not Found") && (
                                <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-white rounded-lg shadow-2xl border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="text-sm font-semibold text-neutral-800 mb-2">Full Address:</div>
                                    <div className="text-sm text-neutral-600 space-y-1">
                                        {village && <div>{village.replace(', ', '')}</div>}
                                        {district && <div>{district.replace(', ', '')}</div>}
                                        {pincode && pincode !== "Fetching..." && pincode !== "Error" && pincode !== "Not Found" && (
                                            <div>PIN: {pincode}</div>
                                        )}
                                    </div>
                                    {/* Arrow pointer */}
                                    <div className="absolute -top-1 left-4 w-2 h-2 bg-white transform rotate-45 border-l border-t border-neutral-200"></div>
                                </div>
                            )}
                        </div>

                        {/* Location (Mobile - Compact) */}
                        <div className="xl:hidden flex items-center gap-1 px-2 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 smooth-transition relative group">
                            <MapPin className="w-4 h-4 text-accent-300" />
                            <span className="text-xs font-bold text-white truncate max-w-16">{district ? district.replace(', ', '') : "Location"}</span>

                            {/* Mobile Tooltip with full location on hover/tap */}
                            {(village || district || pincode !== "Fetching..." && pincode !== "Error" && pincode !== "Not Found") && (
                                <div className="absolute top-full right-0 mt-2 w-56 p-3 bg-white rounded-lg shadow-2xl border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="text-sm font-semibold text-neutral-800 mb-2">Delivery Location:</div>
                                    <div className="text-sm text-neutral-600 space-y-1">
                                        {village && <div>{village.replace(', ', '')}</div>}
                                        {district && <div>{district.replace(', ', '')}</div>}
                                        {pincode && pincode !== "Fetching..." && pincode !== "Error" && pincode !== "Not Found" && (
                                            <div>PIN: {pincode}</div>
                                        )}
                                    </div>
                                    {/* Arrow pointer */}
                                    <div className="absolute -top-1 right-4 w-2 h-2 bg-white transform rotate-45 border-l border-t border-neutral-200"></div>
                                </div>
                            )}
                        </div>

                        {/* Profile Actions */}
                        {isAuthenticated && (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleProfileClick}
                                    className="p-2 rounded-lg bg-success-500/20 text-success-200 hover:bg-success-500/30 hover:text-success-100 smooth-transition hover:scale-110"
                                >
                                    <User className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-lg bg-error-500/20 text-error-200 hover:bg-error-500/30 hover:text-error-100 smooth-transition hover:scale-110"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Cart */}
                        <Link to="/cart" className="relative group ml-2">
                            <div className="p-2 rounded-lg bg-white/20 hover:bg-white/30 smooth-transition hover:scale-110 border border-white/30">
                                <svg
                                    className="w-5 h-5 text-white group-hover:text-accent-200 smooth-transition"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M16 16H8m8 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
                                    />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse border-2 border-white z-10">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Secondary Navigation Bar */}
            <div className="bg-gradient-to-r from-white via-neutral-50 to-white border-b border-neutral-200/50 shadow-soft backdrop-blur-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-2">
                    <div className="flex items-center justify-between overflow-hidden">

                        {/* Navigation Links */}
                        <div className="flex items-center gap-2 flex-shrink-0 overflow-hidden">
                            {navComponents.map((item, index) => {
                                const path = item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`;
                                const isActive = location.pathname === path;

                                return (
                                    <Link
                                        key={item}
                                        to={path}
                                        className={`relative flex-shrink-0 px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-xl smooth-transition group ${isActive
                                            ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-medium"
                                            : "text-neutral-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:shadow-soft"
                                            }`}
                                    >
                                        {/* Background glow effect for active items */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-xl blur-md opacity-30 -z-10 group-hover:opacity-50 smooth-transition"></div>
                                        )}

                                        {/* Icon for each nav item */}
                                        <span className="flex items-center gap-2">
                                            {item === "Home" && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                            )}
                                            {item === "Today's Deals" && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            {item === "Orders" && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            )}
                                            {item === "Wish List" && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            )}
                                            {item === "Contact Us" && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {item === "Sign In" && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                            )}
                                            <span>{item}</span>
                                        </span>

                                        {/* Underline animation for non-active items */}
                                        {!isActive && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-3/4 smooth-transition duration-300"></div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Enhanced Quick Actions */}
                        <div className="hidden lg:flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-success-50 to-emerald-50 rounded-lg border border-success-200/50">
                                <div className="w-3 h-3 bg-gradient-to-r from-success-400 to-emerald-400 rounded-full shadow-sm animate-pulse"></div>
                                <span className="font-semibold text-success-700">Free Shipping $50+</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg border border-accent-200/50">
                                <div className="w-3 h-3 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full shadow-sm animate-pulse"></div>
                                <span className="font-semibold text-accent-700">24/7 Support</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/50">
                                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-sm animate-pulse"></div>
                                <span className="font-semibold text-purple-700">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


