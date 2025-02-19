import React from 'react'


export default function Navbar() {
    return (
        <div className="nav">
            <nav className="bg-black">
                <span className="brand-name">Trez</span>
                <img className="brand-name-image" src="/images/finalshoplogo.ico" alt="logo" width="66.5px" height="50px" />
                <span className="brand-name">ra</span>
                <span className="userLocation">
                    New Delhi
                    110091
                </span>
                <div className="search-container">
                    <input type="text" className="search-box" placeholder="Search..." />
                    <span className="search-icon"><img src="/images/search.jpg" width="20px" height="20px" /></span>
                </div>
                <span className="home-in">
                    <a href="/">Home</a>
                </span>
                <span className="sign-in">
                    <a href="signin">Sign In</a>
                </span>
                <span className="create-button">
                    <a href="create_account">Create Account</a>
                </span>
                <span className="orders">
                    <a href="orders">Orders</a>
                </span>
                <span className="help">
                    <a href="help">Contact Us</a>
                </span>
                <div className="cart-container">
                    <span className="cart-icon">
                        <a href="cart"> <i className="fa-solid fa-cart-shopping fa-2x"></i></a>
                    </span>
                    <span className="cart-badge">5</span>
                </div>

            </nav>
        </div>
    )
}