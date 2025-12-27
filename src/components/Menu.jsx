import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext.jsx";

import { useNavigate } from "react-router-dom";
import FoodTable from "./FoodTable/FoodTable";

const Menu = () => {
  const [category, setCategory] = useState("All");
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  // ✅ Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <FoodTable />
    </div>
  );
};

export default Menu;
