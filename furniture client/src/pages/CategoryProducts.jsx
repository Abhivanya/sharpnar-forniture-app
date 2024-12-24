import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState({});
  useEffect(() => {
    const fetchProduct = () => {
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
          console.log(res);
          setProducts(res);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    };
    fetchProduct();
  }, []);

  let filteredProducts = {};
  if (Object.entries(products).length > 0) {
    filteredProducts = Object.fromEntries(
      Object.entries(products).filter(
        ([key, value]) => value.category === category
      )
    );
  }

  console.log(filteredProducts);

  return (
    <Container fluid className=" rounded-md mt-[80px] p-0">
      <Container fluid className="bg-white p-0">
        <ProductList
          products={filteredProducts}
          label={category.toUpperCase()}
        />
      </Container>
    </Container>
  );
};

export default CategoryProducts;
