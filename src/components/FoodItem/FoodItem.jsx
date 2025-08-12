import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from "../../Context/StoreContext.jsx";
import { Link, useNavigate } from 'react-router-dom';

const FoodItem = ({ image, name, id }) => {
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // ✅ Track loading state

  // ✅ If user not logged in, redirect to login when clicking item
  const handleClick = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  // ✅ Check if item details are missing
  if (!id || !image || !name) {
    return (
      <div className="food-item error">
        <p>⚠️ Something went wrong while loading this item.</p>
      </div>
    );
  }

  return (
    <div className="food-item">
      <Link
        to={`/food/${id}`}
        className="food-item-link"
        onClick={handleClick}
      >
        <div className="food-item-img-container">
          {loading && (
            <div className="image-loader">
              <div className="spinner"></div>
            </div>
          )}
          <img
            className="food-item-image"
            src={image}
            alt={`Image of ${name}`}
            onError={(e) => (e.target.src = assets.fallback_image)}
            onLoad={() => setLoading(false)} // ✅ Hide loader when image loads
          />
          <button className="food-item-btn">Order Now</button>
        </div>
        <div className="food-item-info">
          <p className="food-item-name">{name}</p>
          <img className="food-item-rating" src={assets.rating_starts} alt="Rating" />
        </div>
      </Link>
    </div>
  );
};

export default FoodItem;
