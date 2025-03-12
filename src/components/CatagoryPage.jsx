import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";



export default function CategoryPage() {
    const { categoryName } = useParams();
    const formattedCategory = categoryName.replace(/-/g, " ");


    const [searchResults, setSearchResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                const API_URL = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${API_URL}/api/search-products/?q=${encodeURIComponent(formattedCategory)}&page=${currentPage}`);
                console.log(response.data);
                setSearchResults(response.data.products);
                setNumberOfPages(response.data.total_pages);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setIsLoading(false);
            }
        };

        if (formattedCategory) {
            fetchSearchResults();
        }
    }, [formattedCategory, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {/* Category Title */}
            <h2 className="text-center text-2xl font-semibold mt-4">
                Category: {formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)}
            </h2>

            <div className="flex justify-center items-center py-10 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl px-6">
                    {searchResults.map((product) => (
                        <div key={product.unique_id}
                            className="w-[400px] h-[600px] border-2 border-gray-300 bg-white rounded-2xl shadow-xl p-6 
                                    hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 
                                    flex flex-col items-center text-center">
                            <img className="w-full h-52 object-cover rounded-lg shadow-md" src={product.image} alt={product.name} />
                            <h3 className="font-extrabold text-2xl mt-5 text-gray-800">{product.name}</h3>
                            <p className="text-md text-gray-600 mt-2 font-medium">Price: <span className="text-purple-600 font-semibold">{product.price}</span></p>
                            <h4 className="font-bold mt-3 text-yellow-500 text-lg">⭐ {product.rating}</h4>
                            <button className="bg-purple-600 text-white h-12 w-4/5 rounded-xl mt-6 hover:bg-purple-700 
                                           transition-all duration-300 ease-in-out transform hover:scale-110 shadow-md">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>


        </div>

    );
}
