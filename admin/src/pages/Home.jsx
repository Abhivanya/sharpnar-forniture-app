import React, { useContext, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import Product from "../components/Product";
import ProductContext from "../store/productContext";

const Home = () => {
  const { products, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Container
      fluid="md"
      className="bg-gray-400 min-h-[85vh] rounded-md  mt-[100px] p-3 md:p-0"
    >
      <ul>
        {products && Object.keys(products).length > 0 ? (
          Object.entries(products).map(([key, value]) => (
            <Product key={key} productId={key} productDetails={value} />
          ))
        ) : (
          <p>No Prdocts</p>
        )}
      </ul>
    </Container>
  );
};

export default Home;
