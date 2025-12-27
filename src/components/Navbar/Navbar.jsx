import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import logos from "/logo.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMenuOpen(false); // Close mobile menu if open
    setProfileOpen(false);
    navigate("/");
  };

  // ✅ Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // ✅ Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-left">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img className="navbar-logo" src={logos} alt="Logo" />
        </Link>
      </div>

      {/* Desktop & Mobile Menu */}
      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/menu"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          Menu
        </NavLink>

        {/* <NavLink
          to="/myorders"
          className="navbar-link"
          onClick={() => {
            setMenuOpen(false);
            navigate("/myorders");
          }}
        >
          Orders
        </NavLink> */}

        <a
          href="#footer"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </a>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Cart */}
        <Link
          to="/cart"
          className="navbar-icon-wrapper"
          onClick={() => setMenuOpen(false)}
        >
          <img src={assets.basket_icon} alt="Cart" />
          {getTotalCartAmount() > 0 && <div className="navbar-cart-dot" />}
        </Link>

        {/* Login / Profile */}
        {!token ? (
          <button
            className="navbar-btn"
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="navbar-icon"
              onClick={() => setProfileOpen((prev) => !prev)}
            />
            {profileOpen && (
              <ul className="navbar-dropdown">
                {/* <li
                  onClick={() => {
                    setProfileOpen(false);
                    setMenuOpen(false);
                    navigate("/myorders");
                  }}
                >
                  <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                </li>
                <hr /> */}
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="navbar-menu-toggle" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`} />
          <div className={`bar ${menuOpen ? "open" : ""}`} />
          <div className={`bar ${menuOpen ? "open" : ""}`} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
