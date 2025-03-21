import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="bg-blue-600 py-6 mt-10">
            <footer className="container mx-auto flex flex-col items-center text-center">
                {/* Home Link */}
                <div className="mb-3">
                    <Link to={"/"} className="text-white text-lg font-semibold hover:text-gray-200 transition">
                        Home
                    </Link>
                </div>

                {/* Policy Links */}
                <div className="mb-3 flex flex-wrap justify-center gap-4 text-white text-sm">
                    <a href="policies/privacypolicy.txt" className="hover:underline">
                        Privacy Policy
                    </a>
                    <a href="policies/terms&conditions.txt" className="hover:underline">
                        Terms & Conditions
                    </a>
                    <a href="policies/candr.txt" className="hover:underline">
                        Cancellation & Refund
                    </a>
                    <a href="policies/sandd.txt" className="hover:underline">
                        Shipping & Delivery
                    </a>
                    <a href="policies/contactus.txt" className="hover:underline">
                        Contact Us
                    </a>
                </div>

                {/* Data Attribution */}
                <div className="mb-2 text-white text-sm flex flex-wrap justify-center gap-1">
                    Product data sourced from
                    <Link to="https://www.kaggle.com/datasets/datafiniti/electronic-products-prices"
                        className="text-yellow-300 font-semibold hover:underline ml-1">
                        Datafiniti
                    </Link>
                    under
                    <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        className="text-yellow-300 font-semibold hover:underline ml-1">
                        CC BY-NC-SA 4.0
                    </Link>
                </div>

                {/* Copyright Notice */}
                <div className="mt-3 text-white text-xs">
                    © {new Date().getFullYear()} Trezora. All rights reserved. This website is for academic purposes only.
                </div>
            </footer>
        </div>
    );
}
