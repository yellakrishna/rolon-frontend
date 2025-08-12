import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../Context/StoreContext.jsx";
import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list = [], addToCart, removeFromCart, cartItems = {} } = useContext(StoreContext);

  const [loading, setLoading] = useState(true);
  const [foodItem, setFoodItem] = useState(null);

  useEffect(() => {
    if (food_list.length === 0) {
      setLoading(true);
    } else {
      const item = food_list.find(item => item._id === id);
      setFoodItem(item);
      setLoading(false);
    }
  }, [food_list, id]);

  if (loading) {
    return (
      <div className="food-details-loading">
        <div className="spinner"></div>
        <p>Loading food details...</p>
      </div>
    );
  }

  if (!foodItem) {
    return <div className="food-details-error">⚠️ Food item not found!</div>;
  }

  const quantity = cartItems?.[id] || 0;

  return (
    <div className="food-details-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="food-details-wrapper">
        {/* Image */}
        <div className="food-image-container">
          <img src={foodItem.image} alt={foodItem.name} />
        </div>

        {/* Info */}
        <div className="food-info">
          <h1>{foodItem.name}</h1>
          <p className="description">{foodItem.description}</p>
          <p className="price">₹{foodItem.price}</p>

          {/* Quantity Controls */}
          <div className="quantity-selector">
            <button onClick={() => removeFromCart(id)} disabled={quantity === 0}>−</button>
            <span>{quantity}</span>
            <button onClick={() => addToCart(id)}>+</button>
          </div>

          {/* Desktop Button */}
          <button className="add-to-cart-btn" onClick={() => navigate('/cart')}>
            Go to Cart
          </button>
        </div>
      </div>

      {/* Sticky Mobile Cart Bar */}
      <div className="mobile-cart-bar">
        <span className="mobile-price">₹{foodItem.price}</span>
        <button onClick={() => navigate('/cart')}>Go to Cart</button>
      </div>
    </div>
  );
};

export default FoodDetails;
