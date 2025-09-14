import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateAccount() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);


    const handleChange = ((e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

        // Clear message when user starts typing
        if (message) {
            setMessage("");
        }
    });

    const handlePassword = ((e) => {
        setConfirmPassword(e.target.value);

        // Clear message when user starts typing
        if (message) {
            setMessage("");
        }
    })

    const handleSubmit = (async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Client-side password validation
        if (formData.password !== confirmPassword) {
            setMessage("Error: Passwords do not match. Please make sure both password fields are identical.");
            setLoading(false);
            return;
        }

        const dataToSend = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            mobile_number: formData.mobileNumber,
            email: formData.email,
            password: formData.password,
            confirm_password: confirmPassword,
        };

        try {
            const response = await axios.post(`${API_URL}/api/create-customer-account/`, dataToSend, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Handle successful response
            if (response.status === 200 || response.status === 201) {
                setMessage(response.data.message || "Account created successfully! Welcome to Trezora!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobileNumber: "",
                    password: ""
                });
                setConfirmPassword("");
            }
        } catch (error) {
            console.error('Error creating account:', error);

            // Handle different types of errors
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                if (errorData.message) {
                    // Single error message
                    setMessage(`Error: ${errorData.message}`);
                } else if (errorData.errors && Array.isArray(errorData.errors)) {
                    // Multiple error messages
                    setMessage(`Error: ${errorData.errors.join('. ')}`);
                } else if (errorData.details) {
                    // Field-specific errors
                    const errorMessages = [];
                    Object.keys(errorData.details).forEach(field => {
                        if (Array.isArray(errorData.details[field])) {
                            errorMessages.push(...errorData.details[field]);
                        }
                    });
                    setMessage(`Error: ${errorMessages.join('. ')}`);
                } else {
                    setMessage("Error: An unexpected error occurred. Please try again.");
                }
            } else if (error.request) {
                // Network error
                setMessage("Error: Unable to connect to the server. Please check your internet connection and try again.");
            } else {
                // Other errors
                setMessage("Error: An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-12">
            {/* Background decorative elements */}
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }} />

            <div className="relative w-full max-w-lg">
                {/* Glassmorphism container */}
                <div className="glassmorphism bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-large border border-white/50 animate-fade-in-up">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold gradient-text mb-2">Join Trezora</h2>
                        <p className="text-neutral-600">Create your account and start shopping</p>
                    </div>

                    <form method="POST" className="space-y-6" onSubmit={handleSubmit}>

                        {/* Name Fields Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700" htmlFor="firstName">
                                    First Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder="John"
                                        className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                        required
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700" htmlFor="lastName">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                            </div>
                        </div>

                        {/* Mobile Number Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-neutral-700" htmlFor="mobileNumber">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="mobileNumber"
                                    placeholder="9999999999"
                                    className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                    required
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                            </div>
                        </div>

                        {/* Password Fields Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="••••••••"
                                        className={`w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700 ${confirmPassword && formData.password && confirmPassword !== formData.password
                                            ? 'border-red-300 focus:ring-red-400 focus:border-red-400'
                                            : confirmPassword && formData.password && confirmPassword === formData.password
                                                ? 'border-green-300 focus:ring-green-400 focus:border-green-400'
                                                : 'border-neutral-200'
                                            }`}
                                        required
                                        value={confirmPassword}
                                        onChange={handlePassword}
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />

                                    {/* Password match indicator */}
                                    {confirmPassword && formData.password && (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {confirmPassword === formData.password ? (
                                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* Password match text indicator */}
                                {confirmPassword && formData.password && confirmPassword !== formData.password && (
                                    <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                                )}
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
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </span>
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center pt-4">
                            <p className="text-neutral-600">
                                Already have an account?{' '}
                                <Link
                                    to="/sign-in"
                                    className="font-semibold text-primary-600 hover:text-accent-600 smooth-transition hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Message Display */}
                {message && (
                    <div className={`mt-6 p-4 glassmorphism backdrop-blur-sm rounded-xl border animate-fade-in text-center ${message.includes('Error') || message.includes('error')
                        ? 'bg-red-50/70 border-red-200/50 text-red-700'
                        : 'bg-green-50/70 border-green-200/50 text-green-700'
                        }`}>
                        <div className="flex items-center justify-center gap-2">
                            {message.includes('Error') || message.includes('error') ? (
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                            <p className="font-medium">
                                {message}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}