import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/updateproduct/:productId" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
};

export default App;
