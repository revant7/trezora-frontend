import React from "react";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
    const { categoryName } = useParams();
    console.log(categoryName);

    const formattedCategory = categoryName.replace(/-/g, " ");

    return (
        <div>
            {/* Category Title */}
            <h2 className="text-center text-2xl font-semibold mt-4">
                Category: {formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)}
            </h2>
            
            {/* Grid Layout for the Product */}
            <div className="flex justify-center items-center flex-grow py-10 rounded-lg">
                <div className="grid w-[400px] h-[600px] border-2 border-black bg-white rounded-lg p-4">
                    {/* Image of the product */}
                    <img className="w-full h-auto py-5" src="/images/macbook.jpg" alt="laptop" />
                    
                    {/* Product Information */}
                    <h3 className="font-bold text-2xl mb-4">MacBook Air</h3>
                    <p className="text-sm mb-6">
                        The MacBook Air is a slim, portable laptop with great battery life and solid performance, thanks to the M1 or M2 chip.
                        It's ideal for everyday tasks like browsing and media consumption but isn't suited for heavy gaming or 
                        intense video editing due to its limited graphics power.
                    </p>
                    <h4 className="font-bold">Rating: 4.5/5</h4>
                    
                    {/* Add to Cart Button */}
                    <button className="bg-purple-600 text-white h-12 w-full rounded-md hover:bg-purple-700 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
