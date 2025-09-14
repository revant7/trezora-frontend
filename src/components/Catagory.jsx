import React from 'react';
import { Link } from 'react-router-dom';

export default function Catagory() {
    const catagories = [
        "Home Appliances",
        "Kitchen Appliances",
        "Laptops",
        "Mobile Phones",
        "Tablets",
        "Smart Watches",
        "Headphones",
        "Accessories"
    ];

    return (
        <div className="px-8 py-12 bg-gradient-to-b from-neutral-50 to-white">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-neutral-800 mb-4 gradient-text">
                    Shop by Category
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                    Discover amazing products across all categories
                </p>
            </div>

            {/* Categories Grid */}
            <div className="flex flex-wrap gap-8 justify-center items-center max-w-6xl mx-auto">
                {catagories.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center group animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <Link
                            to={`/catagory/${item.toLowerCase().replace(/ /g, "-")}`}
                            className="flex flex-col items-center"
                        >
                            {/* Category Icon Container */}
                            <div className="relative w-20 h-20 mb-4">
                                {/* Background Circle */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full opacity-10 group-hover:opacity-20 smooth-transition" />

                                {/* Icon Container */}
                                <div className="relative w-full h-full rounded-full glassmorphism bg-white/80 backdrop-blur-sm border border-white/50 shadow-medium group-hover:shadow-glow smooth-transition hover-lift overflow-hidden">
                                    <img
                                        src={`/images/${item.replace(/ /g, "_")}.ico`}
                                        alt={item}
                                        className="w-full h-full object-cover p-3 group-hover:scale-110 smooth-transition"
                                    />

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 smooth-transition" />
                                </div>

                                {/* Floating effect background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 smooth-transition scale-150" />
                            </div>

                            {/* Category Name */}
                            <span className="text-sm font-semibold text-neutral-700 group-hover:text-primary-600 smooth-transition text-center max-w-24 leading-tight">
                                {item}
                            </span>

                            {/* Underline effect */}
                            <div className="w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 group-hover:w-full smooth-transition mt-1 rounded-full" />
                        </Link>
                    </div>
                ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute left-8 top-1/2 w-32 h-32 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute right-8 bottom-1/4 w-24 h-24 bg-gradient-to-r from-accent-200 to-primary-200 rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        </div>
    );
}
