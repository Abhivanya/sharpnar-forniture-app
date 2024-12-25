import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import ProductCard from "../components/ProductCard";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);

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

    if (category) {
      if (Object.entries(products).length < 1) return;
      const results = Object.entries(products).filter(([key, item]) =>
        item.category.toLowerCase().includes(category)
      );

      setFilteredResults(results);
      console.log(results);
    } else {
      setFilteredResults([]);
    }
  }, [category]);

  return (
    <Container fluid className=" rounded-md mt-[80px] p-0">
      <Container fluid="md" className="bg-white  rounded-md mt-[100px] p-4">
        <h1 className="text-2xl text-black  ml-4  border-b-2 py-3 font-bold">
          {category}
        </h1>

        {filteredResults.length > 0 ? (
          <div className="flex flex-wrap p-4">
            {filteredResults.map(([key, value]) => (
              <ProductCard item={value} key={key} productId={key} />
            ))}
          </div>
        ) : (
          <p>No item found</p>
        )}
      </Container>
    </Container>
  );
};

export default CategoryProducts;
