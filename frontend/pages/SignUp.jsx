import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setLoading, setUser } from '../redux/authSlice'
import { USER_API_ENDPOINT } from '../utlis/constants'
import axios from 'axios'
import { toast } from 'sonner'
import Navbar from './Navbar'

const Login = () => {
    const [input, setInput] = useState({
        name:"",
        email: "",
        password: ""
    })
    const { loading, user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, input, {
                headers: {
                    "content-type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Login failed.");
        } finally {
            dispatch(setLoading(false))
        }
    };


    return (
        <div>
            <Navbar />
            
            <div className="min-h-screen flex items-center justify-center bg-[#0A2647] text-white px-4">
                <form onSubmit={submitHandler} className="w-full max-w-md bg-[#144272] p-8 rounded-2xl shadow-lg shadow-blue-900/30">
                    <h1 className="text-2xl font-bold mb-6 text-[#2C74B3]">Sign Up</h1>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-white">Name</label>
                            <input
                                type="name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                required
                                className="w-full p-2 mt-1 bg-[#205295] text-white border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                required
                                className="w-full p-2 mt-1 bg-[#205295] text-white border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                required
                                className="w-full p-2 mt-1 bg-[#205295] text-white border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-4 bg-[#2C74B3] hover:bg-[#205295] text-white font-medium transition-all duration-200"
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
                        </Button>

                        <p className="text-sm text-white mt-2">
                            Already have an account? <Link to="/login" className="text-[#2C74B3] hover:underline">Login</Link>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
