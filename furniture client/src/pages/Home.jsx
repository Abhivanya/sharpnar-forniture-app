import React, { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import Category from "../components/Category";
import ProductList from "../components/ProductList";

const Home = () => {
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
          setProducts(res);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    };
    fetchProduct();
  }, []);

  const filteredProduct = products;

  return (
    <Container fluid className="bg-white rounded-md mt-[80px] p-0">
      <Container fluid className="bg-black p-0">
        <Carousel className="w-full" controls>
          <Carousel.Item>
            <img
              src="https://www.nilkamalfurniture.com/cdn/shop/files/Mobile-banner_CS_Bed.jpg?v=1734699027"
              alt="Modern Bedroom Furniture"
              className="d-block w-100"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://www.nilkamalfurniture.com/cdn/shop/files/Mobile-banner_CS_Living.jpg?v=1734699123"
              alt="Living Room Collection"
              className="d-block w-100"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://www.nilkamalfurniture.com/cdn/shop/files/Mobile-banner_CS_Living.jpg?v=1734699123"
              alt="Living Room Furniture"
              className="d-block w-100"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
      <Category />
      <ProductList products={products} />
    </Container>
  );
};

export default Home;
