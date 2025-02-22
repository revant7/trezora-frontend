import React from 'react'

export default function Catagory() {

    const catagories = ["Home Appliances", "Kitchen Appliances", "Laptops", "Mobile Phones", "Tablets", "Smart Watches", "Headphones", "Accessories"]

    return (
        <div className="flex gap-3 px-6 py-4 justify-center items-center">
            {
                catagories.map(
                    (item) => (
                        <div div className="">
                            <div className=" hover:scale-110">
                                <img src={`/images/${item.replace(" ", "_")}.ico`} alt={item} height="100px" width="100px" className="rounded-full border-4 border-s-black" />
                            </div>
                            <div className="text-container">
                                <span className="title">{item}</span>
                            </div>
                        </div>
                    )
                )

            }
        </div >

    )
}
