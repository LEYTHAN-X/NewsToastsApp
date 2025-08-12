import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            {/* Animated starry background */}
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>

            {/* Content */}
            <div className="about-content">
                <h1 className="about-title">🚀 Welcome to NewsToasts</h1>
                <p className="about-text">
                    Explore the universe of breaking news, from business to technology,
                    health to sports — all wrapped in a galaxy of knowledge.
                </p>
                <p className="about-text">
                    We bring you the latest stories with a smooth, space-inspired design
                    that feels out of this world.
                </p>
            </div>
        </div>
    );
};

export default About;
