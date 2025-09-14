import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

            <div className="relative">
                {/* Main Footer Content */}
                <div className="container mx-auto px-6 py-12">

                    {/* Logo and Brand Section */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-white font-bold text-3xl tracking-wide gradient-text">Trez</span>
                            <img
                                className="bg-transparent drop-shadow-lg"
                                src="/images/finalshoplogo.ico"
                                alt="logo"
                                width="42"
                                height="42"
                            />
                            <span className="text-white font-bold text-3xl tracking-wide gradient-text">ra</span>
                        </div>
                        <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
                            Your trusted e-commerce destination for amazing products and exceptional shopping experiences.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-8 mb-8">
                        <Link
                            to="/"
                            className="text-neutral-300 hover:text-accent-400 font-medium smooth-transition hover:scale-105"
                        >
                            Home
                        </Link>
                        <Link
                            to="/today's-deals"
                            className="text-neutral-300 hover:text-accent-400 font-medium smooth-transition hover:scale-105"
                        >
                            Today's Deals
                        </Link>
                        <Link
                            to="/contact-us"
                            className="text-neutral-300 hover:text-accent-400 font-medium smooth-transition hover:scale-105"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Policy Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
                        <a
                            href="policies/privacypolicy.txt"
                            className="text-neutral-400 hover:text-primary-400 smooth-transition hover:underline"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="policies/terms&conditions.txt"
                            className="text-neutral-400 hover:text-primary-400 smooth-transition hover:underline"
                        >
                            Terms & Conditions
                        </a>
                        <a
                            href="policies/candr.txt"
                            className="text-neutral-400 hover:text-primary-400 smooth-transition hover:underline"
                        >
                            Cancellation & Refund
                        </a>
                        <a
                            href="policies/sandd.txt"
                            className="text-neutral-400 hover:text-primary-400 smooth-transition hover:underline"
                        >
                            Shipping & Delivery
                        </a>
                    </div>

                    {/* Data Attribution */}
                    <div className="text-center text-sm text-neutral-400 mb-6">
                        <p className="mb-2">
                            Product data sourced from{' '}
                            <Link
                                to="https://www.kaggle.com/datasets/datafiniti/electronic-products-prices"
                                className="text-accent-400 hover:text-accent-300 font-semibold smooth-transition hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Datafiniti
                            </Link>
                            {' '}under{' '}
                            <Link
                                to="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                                className="text-accent-400 hover:text-accent-300 font-semibold smooth-transition hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CC BY-NC-SA 4.0
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-700 bg-black/30 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                            {/* Copyright */}
                            <div className="text-neutral-400 text-sm text-center md:text-left">
                                © {new Date().getFullYear()} Trezora. All rights reserved.
                                <span className="block md:inline md:ml-2">This website is for academic purposes only.</span>
                            </div>

                            {/* Social Links Placeholder */}
                            <div className="flex items-center gap-4">
                                <span className="text-neutral-500 text-sm">Follow us:</span>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
                                        <span className="text-xs font-bold">f</span>
                                    </div>
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
                                        <span className="text-xs font-bold">t</span>
                                    </div>
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed">
                                        <span className="text-xs font-bold">i</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
