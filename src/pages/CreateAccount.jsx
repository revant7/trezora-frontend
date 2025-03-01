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

    });

    const handlePassword = ((e) => {
        setConfirmPassword(e.target.value);
    })

    const handleSubmit = (async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (formData.password === confirmPassword) {

            const dataToSend = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                mobile_number: formData.mobileNumber,
                email: formData.email,
                password: formData.password,

            };

            try {
                const response = await axios.post(`${API_URL}/api/create-customer-account/`, dataToSend, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200 || response.status === 201) {
                    setMessage("Form submitted successfully!");
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        mobileNumber: "",
                        password: ""
                    });
                    setConfirmPassword("");
                } else {
                    setMessage("Failed to submit the form. Please try again.");
                }
            } catch (error) {
                setMessage(`Error: ${error.response?.data?.detail || error.message}`);
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>

            <div className="flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

                    <form method="POST" className="space-y-4" onSubmit={handleSubmit}>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1" htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="John"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                                required
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1" htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Doe"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1" htmlFor="number">Mobile Number</label>
                            <input
                                type="text"
                                id="mobileNumber"
                                placeholder="9999999999"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                                required
                                value={formData.mobileNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-1" htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                                required
                                value={confirmPassword}
                                onChange={handlePassword}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-md"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?
                        <Link to={"/sign-in"}><span className="text-blue-500 font-medium hover:underline">Sign In</span></Link>
                    </p>
                </div>
            </div>
            <div>
                {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            </div>
        </>
    )
}