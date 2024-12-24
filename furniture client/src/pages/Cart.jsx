import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CartItem from "../components/CartItem";
import OrderItem from "../components/OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCartItems } from "../store/cartActions";

const Cart = () => {
  const [isCart, setIsCart] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalCount = useSelector((state) => state.cart.totalCount);
  console.log(cartItems);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, location]);
  const handleOrder = () => {
    if (totalCount > 0) {
      navigate("/address");
    }
  };

  return (
    <Container fluid className="rounded-md mt-[80px] p-0 md:w-[80%]">
      <div className="border-2  md:mx-auto flex justify-between  items-center ">
        <div
          className={`${
            isCart && "bg-blue-600 underline"
          } w-full text-2xl text-center mx-auto p-2 font-bold hover:bg-slate-400 border-r-2`}
          onClick={() => setIsCart(true)}
        >
          Cart
        </div>
        <div
          onClick={() => setIsCart(false)}
          className={`${
            !isCart && "bg-blue-600 underline "
          } w-full text-2xl text-center mx-auto p-2 font-bold hover:bg-slate-400 border-r-2`}
        >
          Order
        </div>
      </div>
      <div className="min-h-[400px] border-2 border-gray-200  my-2">
        <ul className="p-3">
          {isCart && <CartItem />}
          {!isCart && <OrderItem />}
        </ul>
      </div>
      {isCart && (
        <div className="flex text-blue-600 bg-white mb-2 justify-evenly items-center w-full p-3 text-2xl font-bold">
          <div>Grand Total : {totalAmount}</div>
          <Button className="text-xl font-bold" onClick={handleOrder}>
            Place Order
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
