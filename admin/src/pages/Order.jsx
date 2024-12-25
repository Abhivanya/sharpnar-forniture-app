import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
const Order = () => {
  const [orders, setOrders] = useState();
  const [refetch, setRefecth] = useState(false);

  useEffect(() => {
    const fetchOrders = () => {
      fetch(
        `https://furniture-app-5c355-default-rtdb.firebaseio.com/order.json`
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
          setOrders(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    };
    fetchOrders();
  }, [refetch]);
  const updateOrderStatus = (e, userId, orderId, orders) => {
    const newStatus = e.target.value;
    if (newStatus === orders.status) return;
    console.log(userId, orderId, orders);

    fetch(
      `https://furniture-app-5c355-default-rtdb.firebaseio.com/order/${userId}/${orderId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: newStatus,
        }),
      }
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
        alert("Status Updated");
        setRefecth(!refetch);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  return (
    <div className=" w-full h-full flex flex-col gap-3 justify-center items-center mt-[80px] bg-slate-200">
      {orders &&
        Object.entries(orders).length > 0 &&
        Object.entries(orders).map(([userId, userOrder]) => (
          <div key={userId} className="border-2 bg-blue-400  m-3 w-full">
            <h1 className="font-bold text-center m-2 text-red-500 bg-white rounded-s-md py-2">
              User Id : {userId}
            </h1>
            {Object.entries(userOrder).map(([orderId, orders], index) => (
              <div key={orderId} className="border-2 m-3 p-3">
                <h1 className="font-bold text-center m-2 text-gray-500">
                  Order Id : {orderId}
                </h1>
                <div className="bg-blue-400 text-white flex flex-col justify-evenly p-3 gap-2">
                  {Object.entries(orders.order).map(
                    ([cartId, indivisualOrder]) => (
                      <OrderCard
                        key={cartId}
                        order={indivisualOrder}
                        orderId={orderId}
                      />
                    )
                  )}
                  <div className="flex justify-evenly p-2 bg-white text-black font-bold">
                    <span>Amount : Rs. {orders.amount}</span>
                    {console.log(orders)}
                    <span className="text-green-600">
                      status :{" "}
                      <select
                        defaultValue={orders.status}
                        onChange={(e) =>
                          updateOrderStatus(e, userId, orderId, orders)
                        }
                      >
                        <option value="orderd">Ordered</option>
                        <option value="dispatch">Dispatch</option>
                        <option value="deliver">Deliver</option>
                        <option value="cancel">Cancel</option>
                      </select>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Order;

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
