import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { menu_list } from "../assets/assets";

export const url = import.meta.env.VITE_API_URL;

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  /* ===================== FOOD ===================== */

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data || []);
    } catch (err) {
      console.error("Error fetching food list:", err.message);
    }
  };

  /* ===================== CART ===================== */

  const loadCartData = async (userToken) => {
    if (!userToken) return;

    try {
      const res = await axios.get(`${url}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setCartItems(res.data.cartData || {});
    } catch (err) {
      console.error("Error loading cart:", err.response?.data || err.message);

      // 🔴 Token invalid → force logout
      if (err.response?.status === 401) {
        setToken("");
        localStorage.removeItem("token");
        setCartItems({});
      }
    }
  };

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (!token) return;

    try {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (!token) return;

    try {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error removing from cart:", err.response?.data || err.message);
    }
  };

  /* ===================== HELPERS ===================== */

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = food_list.find((p) => p._id === id);
      return item ? total + item.price * qty : total;
    }, 0);
  };

  const getTotalCartItems = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  /* ===================== EFFECTS ===================== */

  useEffect(() => {
    fetchFoodList();
  }, []);

  // 🔥 Reload cart WHEN token changes
  useEffect(() => {
    if (token) {
      loadCartData(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  /* ===================== CONTEXT ===================== */

  const contextValue = {
    url,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    token,
    setToken,
    loadCartData,
    setCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
