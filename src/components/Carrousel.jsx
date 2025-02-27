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
        <div
            className="relative"
            style={{
                height: "50vh", // full height of the viewport
                width: "99vw", // full width of the viewport
                overflow: "hidden",
            }}
        >
            <div className="overflow-hidden w-full h-full relative">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${categories.length * 100}%`,
                    }}
                >
                    {categories.map((item, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <img
                                src={`/images/${item}`}
                                alt={item}
                                className="object-cover w-screen " // Ensure it takes up full space
                            />
                        </div>
                    ))}
                </div>

                {/* Left Button */}
                <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
                    onClick={prevSlide}
                >
                    &#10094;
                </button>

                {/* Right Button */}
                <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
                    onClick={nextSlide}
                >
                    &#10095;
                </button>

                {/* Dots Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {categories.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-400"}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
