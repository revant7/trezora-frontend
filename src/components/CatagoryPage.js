import React from "react";
import { useParams } from "react-router-dom";

export default function CatagoryPage() {
    const { categoryName } = useParams();
    console.log(categoryName);
    const formattedCategory = categoryName.replace(/-/g, " ");
    return (
        <div>
            <h2>Category: {formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)}</h2>
        </div>
    );
}