import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ItemCard from './ItemCard';

export default function ItemsHome() {
    const [apiData, setApiData] = useState([]);
    //const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1NTA4MjkwLCJpYXQiOjE3Mzk5NTYyOTAsImp0aSI6IjA1MjE1NDcwNGEwMzQ1ZjE4Y2IyMDUwOTFlZmJjNGE1IiwidXNlcl9pZCI6MX0.VUevWFFbJe8kNh1v4T90s7gSReFhxi8qZfdYQLoTpxE";
    //const headers = { "Authorization": `Bearer ${accessToken}` }

    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/get-products/").then(response => setApiData(response.data)).catch(error => console.error('Error:', error));

    }, []);

    const addToCart = (() => {

    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {
                apiData.map((item) => (

                    <ItemCard image={item.image} product_type={item.product_type} name={item.name} price={item.price} addToCart={addToCart} />

                ))

            }
        </div>

    )
}
