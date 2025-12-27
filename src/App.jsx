import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import Menu from "./components/Menu";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer />

      {/* ✅ Popup when triggered from Navbar */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* ✅ Popup when visiting /login directly */}
      {location.pathname === "/login" && (
        <LoginPopup setShowLogin={() => navigate("/")} />
      )}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/order" element={<PlaceOrder />} />
          {/* <Route path="/myorders" element={<MyOrders />} /> */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
