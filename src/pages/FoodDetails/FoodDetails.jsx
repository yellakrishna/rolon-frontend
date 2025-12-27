import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";
import "./FoodDetails.css";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list = [] } = useContext(StoreContext);

  const [loading, setLoading] = useState(true);
  const [foodItem, setFoodItem] = useState(null);

  useEffect(() => {
    if (food_list.length === 0) {
      setLoading(true);
    } else {
      const item = food_list.find((item) => item._id === id);
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

  return (
    <div className="food-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="food-details-wrapper">
        <div className="food-image-container">
          <img src={foodItem.image} alt={foodItem.tagNo} />
        </div>

        <div className="food-info">
          <h1>
            <strong>TagNo:</strong> {foodItem.tagNo}
          </h1>
          <p className="plantname">
            <strong>Plant Name:</strong> {foodItem.plantName}
          </p>
          <p className="reason">
            <strong>Reason:</strong> {foodItem.reason}
          </p>
          <p className="action">
            <strong>Action:</strong> {foodItem.action}
          </p>
          <p className="remark">
            <strong>Remark:</strong> {foodItem.remark}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
