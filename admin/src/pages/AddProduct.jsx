import React, { useContext, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ProductForm from "../components/ProductForm";
import ProductContext from "../store/productContext";

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const submitForm = (name, desc, category, price, quantity, image) => {
    const isOutofStock = quantity == 0;
    const newProduct = {
      name,
      description: desc,
      category,
      price,
      quantity,
      isOutofStock,
      images: image,
    };
    addProduct(newProduct);
  };
  return (
    <Container
      fluid="md"
      className="bg-gray-400 min-h-[85vh] rounded-md  mt-[100px] p-3 md:p-0 "
    >
      <h1 className="mx-auto text-center text-3xl text-blue-600 font-bold underline underline-offset-4">
        New Product
      </h1>

      <ProductForm submitForm={submitForm} isUpdate={false} />
    </Container>
  );
};

export default AddProduct;
