import React from "react";

export default function ContactUs() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

                <p className="text-gray-600 text-center mb-6">
                    Have questions? We'd love to hear from you. Fill out the form below, and we'll get back to you as soon as possible.
                </p>

                <form className="space-y-5">
                    {/* Name Input */}
                    <div>
                        <label className="text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                        />
                    </div>

                    {/* Message Input */}
                    <div>
                        <label className="text-gray-700 font-medium">Message</label>
                        <textarea
                            rows="4"
                            placeholder="Type your message here..."
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
