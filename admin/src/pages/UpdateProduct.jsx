import React, { useContext, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ProductForm from "../components/ProductForm";
import ProductContext from "../store/productContext";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { updateProduct } = useContext(ProductContext);
  const { productId } = useParams();

  const submitForm = (name, desc, category, price, quantity, imgUrl) => {
    const isOutofStock = quantity == 0;
    const updatedProduct = {
      name,
      description: desc,
      category,
      price,
      quantity,
      isOutofStock,
      images: [imgUrl],
    };
    updateProduct(productId, updatedProduct);
  };
  return (
    <Container
      fluid="md"
      className="bg-gray-400 min-h-[85vh] rounded-md  mt-[100px] p-3 md:p-0 "
    >
      <h1 className="mx-auto text-center text-3xl text-blue-600 font-bold underline underline-offset-4">
        New Product
      </h1>

      <ProductForm
        submitForm={submitForm}
        isUpdate={true}
        productId={productId}
      />
    </Container>
  );
};

export default UpdateProduct;
