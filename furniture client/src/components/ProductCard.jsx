import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { Card } from "react-bootstrap";
import catImg from "../cat1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store/cartActions";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item, productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const image = `../../public/images/${item.images}`;
  const addToCart = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("Login First");
      navigate("/loginsignup");
    }
    dispatch(
      addCartItem(cartItems, {
        id: productId,
        ...item,
      })
    );
  };
  // console.log(item);
  return (
    <Card
      className="w-[40%] md:w-[18%]  rounded-none cursor-pointer"
      onClick={() => navigate(`/product/${productId}`)}
    >
      <Card.Img
        className="object-fillrounded-none h-[300px]"
        src={image}
      ></Card.Img>
      <Card.Body className="">
        <Card.Text className="text-gray-600">{item.name}</Card.Text>
        <div className="flex justify-between items-center mt-2">
          <Card.Text>Rs {item.price}</Card.Text>

          {!item.isOutofStock ? (
            <IoCartOutline
              onClick={addToCart}
              className="rounded-full bg-gray-200 cursor-pointer p-1 text-3xl"
            />
          ) : (
            <span className="text-red-600 font-bold ">Out of Stock</span>
          )}
        </div>

        <Card.Text>Qunatity : {item.quantity}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
