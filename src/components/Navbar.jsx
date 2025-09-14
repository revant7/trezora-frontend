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
                <div className="relative flex items-center justify-between px-4 py-2">

                    {/* Left Section - Logo */}
                    <div className="flex items-center group">
                        <div className="relative">
                            {/* Logo glow effect */}
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 smooth-transition scale-110"></div>

                            {/* Logo container */}
                            <div className="relative flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 smooth-transition">
                                <div className="flex items-center gap-1">
                                    <span className="text-2xl font-black text-white tracking-tight">Trez</span>
                                    <div className="relative">
                                        <img
                                            className="w-8 h-8 drop-shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]"
                                            src="/images/finalshoplogo.ico"
                                            alt="logo"
                                        />
                                        <div className="absolute inset-0 bg-accent-300/30 rounded-full blur-md opacity-0 group-hover:opacity-100 smooth-transition"></div>
                                    </div>
                                    <span className="text-2xl font-black text-white tracking-tight">ra</span>
                                </div>
                                <div className="hidden md:block w-px h-6 bg-white/30"></div>
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
                                        className="flex-1 py-2 sm:py-3 md:py-4 pr-2 sm:pr-3 md:pr-4 text-sm sm:text-base font-medium text-neutral-700 placeholder-neutral-400 bg-transparent focus:outline-none"
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
                                            onClick={() => setQuery(suggestion)}
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
                        <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 smooth-transition">
                            <MapPin className="w-5 h-5 text-accent-300" />
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-white/80">Deliver to</span>
                                <span className="text-sm font-bold text-white truncate max-w-24">{district || "Your Location"}</span>
                            </div>
                        </div>

                        {/* Profile Actions */}
                        {isAuthenticated && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleProfileClick}
                                    className="p-3 rounded-xl bg-success-500/20 text-success-200 hover:bg-success-500/30 hover:text-success-100 smooth-transition hover:scale-110"
                                >
                                    <User className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="p-3 rounded-xl bg-error-500/20 text-error-200 hover:bg-error-500/30 hover:text-error-100 smooth-transition hover:scale-110"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Cart */}
                        <Link to="/cart" className="relative group ml-3">
                            <div className="p-3 rounded-xl bg-white/20 hover:bg-white/30 smooth-transition hover:scale-110 border border-white/30">
                                <svg
                                    className="w-6 h-6 text-white group-hover:text-accent-200 smooth-transition"
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
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse border-2 border-white z-10">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Secondary Navigation Bar */}
            <div className="bg-white border-b border-neutral-200 shadow-sm">
                <div className="px-4 sm:px-6 py-2 sm:py-3">
                    <div className="flex items-center justify-between">

                        {/* Navigation Links */}
                        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                            {navComponents.map((item, index) => (
                                <Link
                                    key={item}
                                    to={item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`}
                                    className={`flex-shrink-0 px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-lg smooth-transition ${getActiveLinkClass(item)}`}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="hidden lg:flex items-center gap-4 text-xs text-neutral-600">
                            <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                                Free Shipping $50+
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                                24/7 Support
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


