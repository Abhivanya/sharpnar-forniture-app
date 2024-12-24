import React from "react";
import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = ({ products, label }) => {
  return (
    <Container fluid className="py-4 min-h-[500px]">
      <h1 className="text-3xl text-gray-800 mb-4 ml-8 font-semibold border-b-2 border-gray-700 ">
        {label}
      </h1>

      <Container fluid className="flex w-full flex-wrap gap-6 justify-around">
        {products && Object.keys(products).length > 0 ? (
          Object.entries(products).map(([key, value]) => (
            <ProductCard key={key} item={value} productId={key} />
          ))
        ) : (
          <p className="text-black text-2xl font-bold">Not found</p>
        )}
      </Container>
    </Container>
  );
};

export default ProductList;
