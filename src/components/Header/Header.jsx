import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import heroImage from '/rolon.jpg'; // ✅ Ensure this file exists in /public or src

const Header = () => {
    return (
        <header
            className="hero"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            {/* Dark overlay */}
            <div className="hero__overlay"></div>

            {/* Content */}
            <div className="hero__content">
                <h1 className="animated-gradient-title">
                     <span className="highlight-gradient">ROLON SEALS</span>
                </h1>
                 <p>
                    Ensure leak-free and efficient operation of your machinery with our professional 
                    mechanical seal installation services. Follow expert guidelines, best practices, 
                    and safety standards for optimal performance and long-lasting seal integrity.
                </p>
                <Link to="/menu">
                    <button className="hero__btn">View Mechanical seals</button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
