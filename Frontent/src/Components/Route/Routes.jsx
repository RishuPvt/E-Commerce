import React from "react";
import Load from "../../../Load";
import UserProfile from "../Profile/UserProfile";
import CartPage from "../ProductDetails/UserCart";
import CategoryPage from "../Categorey/Category";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HotOffersPage from "../Categorey/HotOffers";
function ProfileRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Load />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/Category" element={<CategoryPage />} />
        <Route path="/Offers" element={<HotOffersPage />} />
      </Routes>
    </Router>
  );
}

export default ProfileRouter;
