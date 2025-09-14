import React from "react";

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-12">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

            <div className="relative max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold gradient-text mb-4">Get in Touch</h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 mb-2">Email Us</h3>
                            <p className="text-neutral-600">Send us an email anytime</p>
                            <p className="text-primary-600 font-semibold">hello@trezora.com</p>
                        </div>

                        <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium">
                            <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 mb-2">Call Us</h3>
                            <p className="text-neutral-600">Mon-Fri from 8am to 5pm</p>
                            <p className="text-primary-600 font-semibold">+1 (555) 123-4567</p>
                        </div>

                        <div className="glassmorphism bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-medium">
                            <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-primary-500 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-800 mb-2">Visit Us</h3>
                            <p className="text-neutral-600">Come say hello at our office</p>
                            <p className="text-primary-600 font-semibold">Academic Project</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="glassmorphism bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white/50 shadow-medium">
                            <form className="space-y-6">

                                {/* Name Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-neutral-700">First Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="John"
                                                className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-neutral-700">Last Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Doe"
                                                className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Subject</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-neutral-700">Message</label>
                                    <div className="relative">
                                        <textarea
                                            rows="5"
                                            placeholder="Tell us more about your inquiry..."
                                            className="w-full px-4 py-3 glassmorphism bg-white/50 backdrop-blur-sm border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none smooth-transition placeholder-neutral-400 text-neutral-700 resize-none"
                                        ></textarea>
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 focus-within:opacity-100 smooth-transition pointer-events-none" />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-medium hover:shadow-glow-purple smooth-transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Send Message
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Note about project */}
                <div className="mt-12 text-center">
                    <div className="glassmorphism bg-warning-50/70 backdrop-blur-xl p-6 rounded-2xl border border-warning-200 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-warning-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <h3 className="font-bold text-warning-800">Academic Project</h3>
                        </div>
                        <p className="text-warning-700">
                            This is a fictional contact form for demonstration purposes only.
                            No actual messages will be sent or processed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
