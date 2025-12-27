import React, { useContext, useState } from "react";
import { StoreContext } from "../../Context/StoreContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./FoodItem.css";

const FoodItem = ({
  id,
  image,
  sno,
  date,
  tagNo,
  plantName,
  reason,
  action,
  remark,
}) => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleClick = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <tr>
      <td>{sno}</td>
      <td>{date}</td>
      <td>{tagNo}</td>
      <td>{plantName}</td>
      <td>{reason}</td>
      <td>{action}</td>
      <td>{remark}</td>
      <td className="image-cell">
        <Link to={`/food/${id}`} onClick={handleClick}>
          {loading && <div className="spinner"></div>}
          <img
            src={image || assets.fallback_image}
            alt="item"
            onLoad={() => setLoading(false)}
          />
        </Link>
      </td>
    </tr>
  );
};

export default FoodItem;
