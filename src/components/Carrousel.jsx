import React, { useState, useEffect, useRef } from "react";

export default function Category() {
    const categories = ["Boat Headphones.jpg", "boat.jpg", "Diwali Sale.jpg", "Laptop Sale.jpg"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 my-6">
            <div className="relative max-w-7xl mx-auto h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] overflow-hidden rounded-2xl shadow-lg">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

                <div className="overflow-hidden w-full h-full relative">
                    <div
                        ref={carouselRef}
                        className="flex smooth-transition duration-1000 ease-in-out h-full"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            width: `${categories.length * 100}%`,
                        }}
                    >
                        {categories.map((item, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative h-full">
                                <img
                                    src={`/images/${item}`}
                                    alt={item}
                                    className="w-fit h-fit object-cover bg-neutral-100"
                                />
                                {/* Individual image overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-accent-600/10" />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute top-1/2 left-3 sm:left-6 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 glassmorphism bg-white/20 backdrop-blur-lg text-white rounded-full shadow-medium hover:bg-white/30 smooth-transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-20"
                        onClick={prevSlide}
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        className="absolute top-1/2 right-3 sm:right-6 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 glassmorphism bg-white/20 backdrop-blur-lg text-white rounded-full shadow-medium hover:bg-white/30 smooth-transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-20"
                        onClick={nextSlide}
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
                        {categories.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full smooth-transition hover:scale-125 focus:outline-none ${index === currentIndex
                                    ? "bg-white shadow-glow"
                                    : "bg-white/50 hover:bg-white/75"
                                    }`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                        <div
                            className="h-full bg-gradient-to-r from-primary-400 to-accent-400 smooth-transition duration-1000"
                            style={{ width: `${((currentIndex + 1) / categories.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
