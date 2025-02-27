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
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get-products/?page=${currentPage}`);
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
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {
                    products.map((item) => (

                        <ItemCard key={item.asin} asin={item.asin} image={item.image} product_type={item.product_type} name={item.name} price={item.price} />

                    ))

                }
            </div>
            <PageFooter currentPage={currentPage} totalPages={numberOfPages} onPageChange={handlePageChange} />
        </>

    )
}
