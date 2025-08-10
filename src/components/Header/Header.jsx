import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import heroImage from '/361.jpg'; // ✅ Ensure this file exists in /public or src

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
                    Taste the <span className="highlight-gradient">Best Flavors</span> in Town
                </h1>
                <p>
                    From mouth-watering street food to healthy vegetarian meals, sizzling non-veg dishes, 
                    and irresistible desserts — we’ve got something for everyone. Order now and enjoy fresh, 
                    delicious food delivered to your doorstep.
                </p>
                <Link to="/menu">
                    <button className="hero__btn">Explore Menu</button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
