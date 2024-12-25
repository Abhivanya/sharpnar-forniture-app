import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Login from "./pages/Login";
import { useState } from "react";
import { useEffect } from "react";
import Order from "./pages/Order";
import UpdateOrder from "./pages/UpdateOrder";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const existToken = localStorage.getItem("admin");
    if (existToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/order"
          element={isLoggedIn ? <Order /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/addproduct"
          element={
            isLoggedIn ? <AddProduct /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/updateproduct/:productId"
          element={
            isLoggedIn ? <UpdateProduct /> : <Navigate to="login" replace />
          }
        />
        <Route
          path="/updateorder/:orderId"
          element={
            isLoggedIn ? <UpdateOrder /> : <Navigate to="login" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
