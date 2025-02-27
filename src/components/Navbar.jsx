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
            ? "text-yellow-400 underline underline-offset-4"
            : "text-white";
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

        <div className="mb-2 shadow-lg">
            <nav className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-500 shadow-xl rounded-b-xl backdrop-blur-md bg-opacity-90">

                {/* Logo Section */}
                <div className="flex items-center gap-1 pr-3">
                    <span className="text-white font-extrabold text-2xl tracking-wide drop-shadow-lg">Trez</span>
                    <img className="bg-transparent drop-shadow-lg" src="/images/finalshoplogo.ico" alt="logo" width="42" height="42" />
                    <span className="text-white font-extrabold text-2xl tracking-wide drop-shadow-lg">ra</span>
                </div>

                {/* User Location */}
                <div className="flex items-center space-x-1 relative pr-3">
                    <MapPin className="w-5 h-5 text-yellow-400 animate-bounce" />
                    <div className="hidden lg:flex flex-col text-white text-[10px] leading-tight text-left">
                        <span className="font-semibold text-[11px]">Deliver To:</span>
                        <div className="relative group">
                            <p className="font-medium truncate max-w-[80px] cursor-pointer">
                                {district}
                            </p>
                            <div className="absolute left-1/2 -translate-x-1/2 mt-1 bg-gray-900 text-white text-[9px] px-2 py-1 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity shadow-lg pointer-events-none z-50">
                                {district}
                            </div>
                        </div>
                        <p className="font-medium">{pincode}</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-3/4 max-w-md">
                    <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-md px-2 hover:shadow-lg transition border border-gray-300">
                        <input
                            type="text"
                            className="w-full px-4 py-2 text-lg focus:outline-none rounded-l-full text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                            placeholder="Search Trezora..."
                            value={query}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleSearch}
                        />
                        <button
                            className="p-2 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 active:scale-90 transition-all"
                            onClick={handleSearch}
                            aria-label="Search"
                        >
                            <Search className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Search Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                                    onClick={() => setQuery(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


                {/* Navigation Links */}
                <div className="hidden md:flex gap-4 px-4">
                    {navComponents.map((item) => (
                        <Link
                            key={item}
                            to={item === "Home" ? "/" : `/${item.replace(" ", "-").toLowerCase()}`}
                            className={`text-lg font-semibold whitespace-nowrap transition-all duration-300 ease-in-out text-white hover:text-yellow-300 hover:scale-110 transform ${getActiveLinkClass(item)}`}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Profile & Logout Buttons (Only when authenticated) */}
                {isAuthenticated && (
                    <div className="flex gap-2 ml-2">
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-md hover:scale-110 transition-all duration-300 ease-in-out hover:from-green-600 hover:to-green-700"
                        >
                            <User className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full shadow-md hover:scale-110 transition-all duration-300 ease-in-out hover:from-red-600 hover:to-red-700"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                )}

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
                            {cartCount}
                        </span>
                    </Link>
                </div>
            </nav>
        </div>


    );
}


