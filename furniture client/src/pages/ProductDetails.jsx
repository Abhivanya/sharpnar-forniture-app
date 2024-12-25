import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCartItem } from "../store/cartActions";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchProduct = () => {
      fetch(
        `https://furniture-app-5c355-default-rtdb.firebaseio.com/products/${productId}.json`
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
          setProduct(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    };
    fetchProduct();
  }, [productId]);
  const image = `../../public/images/${product.images}`;

  const addProductToCart = () => {
    dispatch(
      addCartItem(
        cartItems,
        {
          id: productId,
          ...product,
        },
        1
      )
    );
  };

  return (
    <Container fluid="md" className="bg-white rounded-md mt-[80px] p-0">
      <div className="flex flex-col gap-6">
        <div className="w-[80%] mx-auto mt-4 md:w-[80%] bg-black">
          <img
            src={image}
            alt="Prouduct Image"
            className="w-full h-auto rounded-md object-cover"
          />
        </div>

        <div className=" flex flex-col  justify-between w-[80%] mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-black ">
            {product.name}
          </h2>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>

          <div className="mb-4">
            <div className="text-xl text-green-600 font-semibold">
              Price: {product.price}
            </div>
            <div className="text-lg text-blue-600 font-medium">
              Category: {product.category}
            </div>
            <div className="text-lg text-gray-700">
              Quantity:{" "}
              {product.isOutofStock ? (
                product.quantity
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
          {/* <div className="flex justify-evenly w-full px-3">
            <button
              className="text-[20px] text-white font-bold px-3 rounded-md text-center items-center bg-blue-700 active:bg-red-700"
              onClick={() => {setItemQuantity(itemQuantity-1)}}
            >
              -
            </button>
            <button
              className="text-[20px] font-bold px-3 rounded-md text-center text-white active:bg-green-800 items-center bg-blue-700"
              onClick={() => {}}
            >
              +
            </button>
          </div>
          */}
          <Button
            variant="success"
            className={` w-full font-bold py-3 my-4`}
            onClick={addProductToCart}
            disabled={product.isOutofStock}
          >
            {!product.isOutofStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
