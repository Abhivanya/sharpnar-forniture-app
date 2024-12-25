import React from "react";
import img from "../components/almira.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  getCartItems,
  removeCartItem,
} from "../store/cartActions";
import { useNavigate } from "react-router-dom";

("../../public");
const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const navigate = useNavigate();
  const increaseCartItem = (item, stock) => {
    if (item.cartQuantity > stock) {
    }
    dispatch(addCartItem(cartItems, item));
  };
  const decreaseCartItem = (key) => {
    dispatch(removeCartItem(cartItems, key));
  };
  return (
    <>
      {totalCount > 0 ? (
        Object.entries(cartItems).map(([key, item]) => (
          <li
            className="flex items-center justify-between border-2 border-black bg-white text-black rounded-md p-1 mb-1"
            key={key}
          >
            <header className="flex gap-3 items-center w-[70%] p-1 px-3">
              <img
                src={`../../public/images/${item.images}`}
                className="w-[80px] object-cover"
              />
              <div>
                <h3 className="font-bold line-clamp-1">{item.name}</h3>
                <p className="line-clamp-1">{item.description}</p>
                <p>Product Price : Rs {item.price}</p>
              </div>
            </header>
            <div className=" w-[25%] flex flex-col justify-center items-center">
              <div className="flex justify-evenly p-2 text-[18px] w-full">
                Price : Rs {item.price * item.cartQuantity}
                <div className="text-red-800">
                  x <span>{item.cartQuantity}</span>
                </div>
              </div>

              <div className="flex justify-evenly w-full px-3">
                <button
                  className="text-[20px] text-white font-bold px-3 rounded-md text-center items-center bg-blue-700 active:bg-red-700"
                  onClick={() => decreaseCartItem(item.id)}
                >
                  -
                </button>
                <button
                  className="text-[20px] font-bold px-3 rounded-md text-center text-white active:bg-green-800 items-center bg-blue-700"
                  onClick={() => increaseCartItem(item, item.quantity)}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p>Cart is Empty</p>
      )}
    </>
  );
};

export default CartItem;
