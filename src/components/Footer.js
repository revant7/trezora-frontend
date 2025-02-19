import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className="flex items-center justify-center py-5 my-4 bg-blue-500">
            <footer>
                <Link to={"/"}><span className='text-white text-xl font-bold'>Home</span></Link>
            </footer>
        </div>
    )
}
