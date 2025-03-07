import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ItemCard from './ItemCard';
import PageFooter from './PageFooter';


export default function SearchResults() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                const API_URL = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${API_URL}/api/search-products/?q=${encodeURIComponent(query)}&page=${currentPage}`);
                console.log(response.data);
                setSearchResults(response.data.products);
                setNumberOfPages(response.data.total_pages);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setIsLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!query) {
        return <div>Please enter a search query.</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800">
                    Search Results For: <span className="text-blue-600">{query}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {searchResults.map((item) => (
                    <ItemCard key={item.unique_id} unique_id={item.unique_id} image={item.image} product_category={item.product_category[0]} name={item.name} price={item.price} />
                ))}
            </div>
            <PageFooter currentPage={currentPage} totalPages={numberOfPages} onPageChange={handlePageChange} />
        </>
    );
}