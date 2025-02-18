import React from 'react'



export default function Carrousel() {
    return (

        <div className="crousal">
            <div className=" flex animate-wiggle ">
                <div className="min-w 100% h 100% transition ease duration-0.5">
                    <img src="/images/boat.jpg" alt="boat" />
                </div>
                <div className="slide">
                    <img src="/images/boat.jpg" alt="boat" />
                </div>
                <div className="slide">
                    <img src="/images/boat.jpg" alt="boat" />
                </div>
            </div>
        </div>

    )
}
