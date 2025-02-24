import React from "react";


const PageFooter = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    // Generate page numbers
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center my-6 flex-wrap">
            {/* Previous Button */}
            <button
                className={`mx-1 px-4 py-2 rounded-lg text-sm font-medium ${currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ⬅ Prev
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`mx-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${currentPage === number
                        ? "bg-blue-600 text-white scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-100"
                        }`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}

            {/* Next Button */}
            <button
                className={`mx-1 px-4 py-2 rounded-lg text-sm font-medium ${currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next ➡
            </button>
        </div>
    );
};

export default PageFooter;
