import React from 'react'
import { Link } from 'react-router-dom';



export default function Navbar() {
    const navComponents = ["Home", "Today's Deals", "Sign In", "Create Account", "Orders", "Wish List", "Contact Us"];
    return (
        <div className="mb-2">

            <nav className="flex bg-blue-500  align-middle ">
                <div className='flex px-4 mx-4'>
                    <span className="text-white font-bold text-2xl py-2">Trez</span>
                    <img className="bg-transparent" src="/images/finalshoplogo.ico" alt="logo" width="66.5px" height="50px" />
                    <span className="text-white font-bold text-2xl py-2">ra</span>
                </div>
                <span className="userLocation">
                    New Delhi
                    110091
                </span>
                <div className="search-container">
                    <input type="text" className="search-box" placeholder="Search..." />
                    <span className="search-icon"><img src="/images/search.jpg" width="20px" height="20px" /></span>
                </div>

                <div className='px-4 py-2 flex gap-4'>

                    {
                        navComponents.map(
                            (item) => (

                                <div>
                                    <Link to={item.replace(" ", "-").toLowerCase()}><span className="text-white text-lg font-bold">{item}</span></Link>
                                </div>

                            )
                        )
                    }
                </div>


                <div className="cart-container">
                    <span className="cart-icon">
                        <a href="cart"> <i className="fa-solid fa-cart-shopping fa-2x"></i></a>
                    </span>
                    <span className="">5</span>
                </div>

            </nav>
        </div >
    )
}