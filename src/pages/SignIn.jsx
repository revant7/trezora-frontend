import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthenticationContext from '../context/AuthenticationContext';

export default function SignIn() {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthenticationContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = ((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    })

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setLoading(true);
        setMessage("");


        try {
            const response = await axios.post(`${API_URL}/api/token/`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },

            });
            console.log(response.data);
            console.log(response.headers);

            if (response.status === 200 || response.status === 201) {
                setMessage("Form submitted successfully!");
                setFormData({ email: "", password: "" }); // Clear form
                console.log(response.data)
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                setIsAuthenticated(true);
                navigate('/', { replace: true });
            } else {
                setMessage("Failed to submit the form. Please try again.");
                setIsAuthenticated(false);
                console.log(response.data);
                console.log(response.headers);
            }
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.detail || error.message}`);
            setIsAuthenticated(false);

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-12">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

            <div className="relative w-full max-w-md">
                {/* Glassmorphism container */}
                <div className="glassmorphism bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-large border border-white/50 animate-fade-in-up">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h2>
                        <p className="text-neutral-600">Sign in to continue your shopping journey</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            <span className="flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </span>
                        </button>

                        {/* Create Account Link */}
                        <div className="text-center pt-4">
                            <p className="text-neutral-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/create-account"
                                    className="font-semibold text-primary-600 hover:text-accent-600 smooth-transition hover:underline"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Message Display */}
                {message && (
                    <div className="mt-6 p-4 glassmorphism bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 animate-fade-in text-center">
                        <p className={`font-medium ${message.includes('Error') ? 'text-error-600' : 'text-success-600'}`}>
                            {message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )

}