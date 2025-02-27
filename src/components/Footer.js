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

                {/* Data Attribution 1 */}
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

                {/* Data Attribution 2 */}
                <div className="text-white text-sm flex flex-wrap justify-center gap-1">
                    Product data sourced from
                    <Link to="https://www.kaggle.com/datasets/datafiniti/electronic-products-prices"
                        className="text-yellow-300 font-semibold hover:underline ml-1">
                        Vimal & Tarun
                    </Link>
                    under
                    <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        className="text-yellow-300 font-semibold hover:underline ml-1">
                        CC BY-SA 4.0
                    </Link>
                </div>
            </footer>
        </div>
    );
}
