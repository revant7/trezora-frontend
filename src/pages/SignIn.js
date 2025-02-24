import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthenticationContext from '../context/notes/authenticationContext';

export default function SignIn() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthenticationContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = ((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    })

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setLoading(true);
        setMessage("");


        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", formData, {
                headers: {
                    "Content-Type": "application/json",
                },

            });

            if (response.status === 200 || response.status === 201) {
                setMessage("Form submitted successfully!");
                setFormData({ email: "", password: "" }); // Clear form
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                setIsAuthenticated(true);
                navigate('/', { replace: true });
            } else {
                setMessage("Failed to submit the form. Please try again.");
                setIsAuthenticated(false);
            }
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.detail || error.message}`);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className='flex items-center justify-center'>
                <div className="flex justify-center items-center bg-white p-8 rounded-2xl shadow-lg w-96">
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
                        <input type="email" placeholder="Email" name="email" id="email" required value={formData.email} onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        <input type="password" placeholder="Password" name="password" required value={formData.password} onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition" disabled={loading} >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                        <p className="text-gray-600">
                            Don't have an account?
                            <Link to={"/create-account"}><span className="text-blue-500 hover:underline font-medium">Create Account</span></Link>
                        </p>
                    </form>
                </div >
            </div>

            <div>
                {message && <p className="mt-4 text-center text-green-600">{message}</p>}
            </div >
        </>

    )

}