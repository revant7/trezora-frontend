import React from "react";
import { Link } from "react-router-dom";

export default function CreateAccount() {
    return (
        <div class="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

            <form action="#" method="POST" class="space-y-4">
                <div>
                    <label class="block text-gray-600 font-medium mb-1" for="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                        required
                    />
                </div>

                <div>
                    <label class="block text-gray-600 font-medium mb-1" for="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                        required
                    />
                </div>

                <div>
                    <label class="block text-gray-600 font-medium mb-1" for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                        required
                    />
                </div>

                <div>
                    <label class="block text-gray-600 font-medium mb-1" for="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="••••••••"
                        class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    class="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-md"
                >
                    Create Account
                </button>
            </form>

            <p class="text-center text-gray-600 mt-6">
                Already have an account?
                <Link to={"sign-in"}><span class="text-blue-500 font-medium hover:underline">Sign In</span></Link>
            </p>
        </div>
    )
}