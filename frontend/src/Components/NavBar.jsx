import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({user}) {
     return (
        <nav className="bg-white text-gray-900 px-6 py-4 shadow-md border-b border-indigo-100">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="text-xl font-bold text-indigo-600">
                    Logo
                </div>
                <div className="hidden md:flex space-x-8 items-center">
                    <Link to = "/" className="text-gray-600 hover:text-indigo-600 transition">Feed</Link>
                    {
                        user ?<>
                         <Link to = "/saved" className="text-gray-600 hover:text-indigo-600 transition">Saved Post</Link>
                         <Link to = "/profile" className="text-gray-600 hover:text-indigo-600 transition">Profile</Link>
                        </>:
                        <Link to = "/auth" className="text-white bg-red-500 px-4 py-2 rounded transition">Login</Link>

                    }
                </div>
            </div>
        </nav>
    )
}