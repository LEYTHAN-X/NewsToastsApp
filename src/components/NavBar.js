import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const navRef = useRef(null);

    // Parallax tilt
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 10;
            const y = (e.clientY / innerHeight - 0.5) * 10;
            if (navRef.current) {
                navRef.current.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');

          /* Star background container */
          .star-bg {
            position: relative;
            overflow: hidden;
          }

          /* Two layers of stars for depth */
          .star-bg::before, .star-bg::after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 300%; height: 300%; /* Large to allow movement */
            background-repeat: repeat;
            background-size: 200px 200px;
            pointer-events: none;
          }

          /* Small star layer */
          .star-bg::before {
            background-image: radial-gradient(1px 1px at 10px 20px, white, transparent),
                              radial-gradient(1px 1px at 50px 80px, white, transparent),
                              radial-gradient(1px 1px at 90px 40px, white, transparent),
                              radial-gradient(1px 1px at 130px 150px, white, transparent),
                              radial-gradient(1px 1px at 170px 90px, white, transparent);
            animation: driftStars 60s linear infinite, twinkle 6s ease-in-out infinite;
            opacity: 0.8;
          }

          /* Larger star layer */
          .star-bg::after {
            background-image: radial-gradient(2px 2px at 30px 60px, #fff, transparent),
                              radial-gradient(2px 2px at 70px 120px, #fff, transparent),
                              radial-gradient(2px 2px at 120px 90px, #fff, transparent),
                              radial-gradient(2px 2px at 160px 200px, #fff, transparent),
                              radial-gradient(2px 2px at 210px 130px, #fff, transparent);
            animation: driftStars 120s linear infinite reverse, twinkle 8s ease-in-out infinite;
            opacity: 0.6;
          }

          /* Drift animation for stars */
          @keyframes driftStars {
            from { transform: translate(0, 0); }
            to { transform: translate(-100px, -100px); }
          }

          /* Twinkle animation */
          @keyframes twinkle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.3; }
          }

          /* Glow link effect */
          .glow-link {
            position: relative;
            z-index: 2;
            transition: transform 0.3s ease, color 0.3s ease;
            font-family: 'Dancing Script', cursive;
            text-decoration: none;
          }
          .glow-link:hover::before {
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            background: linear-gradient(90deg, #3b82f6, #1e40af, #22c55e);
            border-radius: 0.375rem;
            filter: blur(8px);
            opacity: 0.8;
            z-index: -1;
            animation: glowPulse 1.5s infinite alternate;
          }
          .glow-link:hover {
            transform: scale(1.1);
            color: #a5f3fc;
          }
          @keyframes glowPulse {
            from { opacity: 0.5; }
            to { opacity: 1; }
          }
        `}
            </style>

            <nav
                ref={navRef}
                className="star-bg fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-blue-800 shadow-lg z-50 transition-transform duration-500"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Brand */}
                        <Link
                            className="text-white text-2xl font-bold tracking-tight glow-link px-3 py-2 rounded-md"
                            to="/"
                        >
                            NewsToasts
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-4">
                            {[
                                { name: "Home", path: "/" },
                                { name: "About", path: "/about" },
                                { name: "Business", path: "/business" },
                                { name: "Entertainment", path: "/entertainment" },
                                { name: "General", path: "/general" },
                                { name: "Health", path: "/health" },
                                { name: "Science", path: "/science" },
                                { name: "Sports", path: "/sports" },
                                { name: "Technology", path: "/technology" },
                            ].map((item) => (
                                <Link
                                    key={item.path}
                                    className="text-white text-lg font-medium glow-link px-3 py-2 rounded-md"
                                    to={item.path}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
