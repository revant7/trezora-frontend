import React from 'react'
import { Link } from 'react-router-dom'

export default function SignIn() {
    return (
        <div className='flex items-center justify-center'>
            <div className="flex justify-center items-center bg-white p-8 rounded-2xl shadow-lg w-96">
                <form className="flex flex-col space-y-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
                    <input type="email" placeholder="Email" required
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    <input type="password" placeholder="Password" required
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition">
                        Sign In
                    </button>
                    <p className="text-gray-600">
                        Don't have an account?
                        <Link to={"/create-account"}><span className="text-blue-500 hover:underline font-medium">Create Account</span></Link>
                    </p>
                </form>
            </div >
        </div>

    )

}