import React, { useEffect, useState } from "react";
import img from "../components/almira.jpg";
const OrderItem = () => {
  const [orders, setOrders] = useState({});
  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("forniture-app"));
    const emailId = email.replace(".", "_");
    fetch(
      `https://furniture-app-5c355-default-rtdb.firebaseio.com/order/${emailId}.json`
    )
      .then((response) => response.json())
      .then((res) => {
        if (!res) return;
        if (res.error) {
          throw new Error(res.error);
        }
        setOrders(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {Object.entries(orders).length > 0 ? (
        Object.entries(orders).map(([key, value]) => {
          console.log(key, value);

          return (
            <li
              className="bg-slate-500 p-3 rounded-md gap-2 flex flex-col my-2 "
              key={key}
            >
              {Object.entries(value.order).map(
                ([netedOrderKey, nestedValue]) => (
                  <OrderCard
                    key={netedOrderKey}
                    order={nestedValue}
                    orderId={`${key}/order/${netedOrderKey}`}
                  />
                )
              )}
              <div className="pl-3">
                Status :{" "}
                <span className="mx-4 text-white bg-green-600 px-3 py-1 rounded-full">
                  {value.status}
                </span>
                Total Amount :
                <span className="text-white bg-red-600 px-3 py-1 rounded-full mx-3">
                  {value.amount}
                </span>
              </div>
            </li>
          );
        })
      ) : (
        <p>No orders</p>
      )}
    </>
  );
};

export default OrderItem;

const OrderCard = ({ order, orderId }) => {
  console.log(orderId);
  if (!order) return;
  return (
    <div className="flex items-center justify-between border-2 border-black bg-white text-black rounded-md p-1 mb-1">
      <header className="flex gap-3 items-center w-[70%] p-1 px-3">
        <img
          src={`../../public/images/${order.images}`}
          className="w-[80px] object-cover"
        />
        <div>
          <h3 className="font-bold line-clamp-1">{order.name} </h3>
          <p className="line-clamp-1">{order.description}</p>
          <span>Total Quantity : {order.cartQuantity}</span>
        </div>
      </header>
      <div className=" w-[30%] p-2 flex flex-col justify-center items-center">
        <div className="flex justify-evenly p-1 text-[18px] w-full flex-col">
          Price : {order.price}
        </div>

        {/* <button
          className=" text-white font-bold px-3 rounded-md self-start mt-1 bg-blue-700 active:bg-red-700 "
          onClick={() => {}}
        >
          Cancel Order
        </button> */}
      </div>
    </div>
  );
};
