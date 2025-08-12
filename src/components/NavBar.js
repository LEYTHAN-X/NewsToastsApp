import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <style>
                {`
                    .glow-on-hover {
                        position: relative;
                        z-index: 1;
                    }
                    .glow-on-hover:hover::before {
                        content: '';
                        position: absolute;
                        top: -4px;
                        left: -4px;
                        right: -4px;
                        bottom: -4px;
                        background: linear-gradient(to right, #3b82f6, #1e40af);
                        border-radius: 0.375rem;
                        filter: blur(8px);
                        opacity: 0.7;
                        z-index: -1;
                        transition: opacity 0.3s ease;
                    }
                    .glow-on-hover:hover {
                        transform: scale(1.05);
                    }
                    .font-cursive-dancing {
                        font-family: 'Dancing Script', cursive;
                    }
                `}
            </style>
            <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-blue-800 shadow-lg z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link className="text-white text-2xl font-bold tracking-tight font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/">NewsToasts</Link>
                        <button className="lg:hidden text-white focus:outline-none transition-all duration-300 hover:ring-2 hover:ring-blue-500 hover:shadow-blue-500/50 p-2 rounded-md" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="block w-6 h-0.5 bg-white mb-1"></span>
                            <span className="block w-6 h-0.5 bg-white mb-1"></span>
                            <span className="block w-6 h-0.5 bg-white"></span>
                        </button>
                        <div className="hidden lg:flex lg:items-center lg:space-x-4" id="navbarSupportedContent">
                            <ul className="flex space-x-2">
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/business">Business</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/entertainment">Entertainment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/general">General</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/health">Health</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/science">Science</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/sports">Sports</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-lg font-medium font-cursive-dancing no-underline transition-all duration-300 glow-on-hover px-3 py-2 rounded-md" to="/technology">Technology</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;