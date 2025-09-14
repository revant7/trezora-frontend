import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import ItemCard from './ItemCard';
import PageFooter from './PageFooter';


export default function ItemsHome() {

    const [numberOfPages, setNumberOfPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);

    //const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1NTA4MjkwLCJpYXQiOjE3Mzk5NTYyOTAsImp0aSI6IjA1MjE1NDcwNGEwMzQ1ZjE4Y2IyMDUwOTFlZmJjNGE1IiwidXNlcl9pZCI6MX0.VUevWFFbJe8kNh1v4T90s7gSReFhxi8qZfdYQLoTpxE";
    //const headers = { "Authorization": `Bearer ${accessToken}` }

    const fetchProducts = useCallback(async () => {
        const API_URL = process.env.REACT_APP_API_URL;
        try {
            const response = await axios.get(`${API_URL}/api/get-products/?page=${currentPage}`);
            setProducts(response.data.products)
            setNumberOfPages(response.data.total_pages);


        } catch (err) {
            console.error("Error fetching products:", err);
        }

    }, [currentPage]);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, fetchProducts]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    return (
        <div className="px-8 py-12 bg-gradient-to-b from-white to-neutral-50">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-neutral-800 mb-4 gradient-text">
                    Featured Products
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                    Discover our handpicked selection of amazing products
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {products.map((item, index) => (
                    <div
                        key={item.unique_id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <ItemCard
                            unique_id={item.unique_id}
                            name={item.name}
                            brand={item.brand}
                            price={item.price}
                            mrp={item.mrp}
                            product_category={item.product_category[0]}
                            image={item.image[0]}
                            product_rating={item.product_rating}
                        />
                    </div>
                ))}
            </div>

            <PageFooter currentPage={currentPage} totalPages={numberOfPages} onPageChange={handlePageChange} />
        </div>
    )
}
