import React from 'react'

export default function Category() {

    const categories = ["Mobile 70", "Boat 1499", "Laptop 80"]

    return (
        <div className="">
            {
                categories.map((item, index) => (
                    <div key={index} className="min-w-full h-full transition ease-in-out duration-500">
                        <img 
                            src={`/images/${item.replace(" ", "__")}.jpg`} 
                            alt={item} 
                        />
                    </div>
                ))
            }
        </div>
    )
}
