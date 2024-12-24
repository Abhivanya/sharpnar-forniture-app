import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";
import Cart from "./pages/Cart";
import { getCartItems } from "./store/cartActions";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Address from "./pages/Address";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("forniture-app"));
    if (!res) return;
    if (res.email && res.token) {
      dispatch(authActions.checkLoggedIn(res));
    }
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartItems());
    }
  }, [isLoggedIn]);
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/address" element={<Address />} />
      </Routes>
      <button
        onClick={() => {
          dispatch(getCartItems());
        }}
      >
        Fetch
      </button>
      <Footer />
    </>
  );
};

export default App;
