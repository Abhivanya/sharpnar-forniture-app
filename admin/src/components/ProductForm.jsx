import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ submitForm, isUpdate, productId }) => {
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const categoryRef = useRef(null);
  const priceRef = useRef(null);
  const quantityRef = useRef(null);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate && productId) {
      fetch(
        `https://furniture-app-5c355-default-rtdb.firebaseio.com/products/${productId}.json`
      )
        .then((response) => response.json())
        .then((res) => {
          if (res == null) {
            console.error("No products found");
            alert("Error");
            return;
          }
          if (res.error) {
            throw new Error(res.error);
          }
          nameRef.current.value = res.name;
          descRef.current.value = res.description;
          categoryRef.current.value = res.category;
          priceRef.current.value = res.price;
          quantityRef.current.value = res.quantity;
          setOldImage(res.images[0]);
        })
        .catch((err) => {
          console.error(err);
          alert(err.message);
        });
    }
  }, [isUpdate, productId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image !== null) {
      setOldImage(image);
    }
    submitForm(
      nameRef.current.value,
      descRef.current.value,
      categoryRef.current.value,
      priceRef.current.value,
      quantityRef.current.value,
      oldImage
    );
    e.target.reset();
    setImage(null);
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="mt-4 p-3 md:p-5 rounded-md bg-slate-300 flex flex-col gap-3 w-[60%] mx-auto"
    >
      <Form.Group className="flex justify-between items-center gap-5 my-2">
        <Form.Label className="font-bold w-[30%] md:w-[10%]">Name</Form.Label>
        <Form.Control
          className="md:w-[600px]"
          type="text"
          ref={nameRef}
          required
          placeholder="Ex.- Double Door Almira"
        />
      </Form.Group>

      <Form.Group className="flex justify-between items-center gap-3 md:gap-5 my-2">
        <Form.Label className="font-bold w-[30%] md:w-[10%]">
          Description
        </Form.Label>
        <Form.Control
          className="md:w-[600px]"
          type="text"
          ref={descRef}
          required
          placeholder="Ex: Two door Almira"
        />
      </Form.Group>

      <Form.Group className="flex flex-col md:flex-row w-full justify-between">
        <Form.Group className="flex md:w-[50%] justify-between items-center gap-2 md:gap-3 my-2">
          <Form.Label className="font-bold w-[40%] md:w-[30%]">
            Category
          </Form.Label>
          <Form.Control
            className="md:w-[215px] mr-4"
            type="text"
            ref={categoryRef}
            placeholder="Category"
            required
          />
        </Form.Group>
        <Form.Group className="flex md:w-[50%] justify-between items-center gap-2 md:gap-3 my-2">
          <Form.Label className="font-bold w-[40%] md:w-[30%]">
            Price
          </Form.Label>
          <Form.Control
            className="md:w-[215px]"
            type="number"
            required
            ref={priceRef}
            min="1"
            placeholder="Rs 300"
          />
        </Form.Group>
      </Form.Group>

      <Form.Group className="flex md:w-[50%] justify-between items-center gap-2 md:gap-3 my-2">
        <Form.Label className="font-bold w-[30%] md:w-[10%]">
          Quantity
        </Form.Label>
        <Form.Control
          className="md:w-[225px]"
          type="number"
          min="0"
          required
          ref={quantityRef}
          max="100"
          placeholder="Quantity"
        />
      </Form.Group>

      <Form.Group className="flex md:w-[50%] justify-between items-center gap-2 md:gap-3 my-2">
        <Form.Label className="font-bold w-[30%] md:w-[10%]">
          Upload Image
        </Form.Label>
        <Form.Control
          className="md:w-[225px]"
          type="file"
          accept="image/*"
          required={isUpdate ? false : true}
          onChange={handleImageChange}
        />
      </Form.Group>

      <Button type="submit" className="w-[50%] mx-auto my-3">
        {isUpdate ? "Update Product" : "Add Product"}
      </Button>
    </Form>
  );
};

export default ProductForm;
