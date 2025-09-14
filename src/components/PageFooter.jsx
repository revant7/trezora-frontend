import React from "react";

const PageFooter = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxVisiblePages = 7;

    // Calculate which pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Generate page numbers
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center my-12 px-4">
            <div className="flex items-center gap-2 glassmorphism bg-white/70 backdrop-blur-xl p-4 rounded-2xl border border-white/50 shadow-medium">

                {/* Previous Button */}
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium smooth-transition ${currentPage === 1
                            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                            : "bg-primary-500 text-white hover:bg-primary-600 hover:shadow-glow active:scale-95"
                        }`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Show first page if not in range */}
                {startPage > 1 && (
                    <>
                        <button
                            className="w-10 h-10 rounded-xl font-semibold smooth-transition bg-white hover:bg-primary-50 text-neutral-700 hover:text-primary-600 border border-neutral-200 hover:border-primary-200"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </button>
                        {startPage > 2 && (
                            <span className="px-2 text-neutral-400">...</span>
                        )}
                    </>
                )}

                {/* Page Numbers */}
                <div className="flex gap-1">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            className={`w-10 h-10 rounded-xl font-semibold smooth-transition ${currentPage === number
                                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow scale-110"
                                    : "bg-white hover:bg-primary-50 text-neutral-700 hover:text-primary-600 border border-neutral-200 hover:border-primary-200 hover:scale-105"
                                }`}
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>

                {/* Show last page if not in range */}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && (
                            <span className="px-2 text-neutral-400">...</span>
                        )}
                        <button
                            className="w-10 h-10 rounded-xl font-semibold smooth-transition bg-white hover:bg-primary-50 text-neutral-700 hover:text-primary-600 border border-neutral-200 hover:border-primary-200"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Next Button */}
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium smooth-transition ${currentPage === totalPages
                            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                            : "bg-primary-500 text-white hover:bg-primary-600 hover:shadow-glow active:scale-95"
                        }`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <span className="hidden sm:inline">Next</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PageFooter;