import React, { useState } from "react";

const ProductContext = React.createContext({
  products: [],
  addProduct: (product) => {},
  updateProduct: (productId, updatedProduct) => {},
  removeProduct: (productId) => {},
  updateOrderStatus: (orderId) => {},
  fetchProducts: () => {},
});

export const ProductProvider = ({ children }) => {
  const test = "test@gmail.com";
  const emailId = test.replace(".", "_");
  const [products, setProducts] = useState({});

  const fetchProducts = () => {
    fetch(
      `https://furniture-app-5c355-default-rtdb.firebaseio.com/products.json`
    )
      .then((response) => response.json())
      .then((res) => {
        if (res == null) {
          console.log("No products found");
          return;
        }
        if (res.error) {
          throw new Error(res.error);
        }
        setProducts(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const addProduct = (product) => {
    fetch(
      `https://furniture-app-5c355-default-rtdb.firebaseio.com/products.json`,
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        console.log(res);
        alert("product added successfully");
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  const updateProduct = (productId, updatedProduct) => {
    fetch(
      `https://furniture-app-5c355-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedProduct),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        alert("Product Updated");
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  const removeProduct = (productId) => {
    fetch(
      `https://furniture-app-5c355-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        alert("Product removed successfully");
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  const updateOrderStatus = (orderId) => {};
  const contextValue = {
    products,
    addProduct,
    updateOrderStatus,
    removeProduct,
    updateProduct,
    fetchProducts,
  };
  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
