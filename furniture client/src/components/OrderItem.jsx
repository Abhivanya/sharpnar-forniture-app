import React from "react";
import img from "../components/almira.jpg";
const OrderItem = () => {
  return (
    <li className="flex items-center justify-between border-2 border-black bg-white text-black rounded-md p-1 mb-1">
      <header className="flex gap-3 items-center w-[70%] p-1 px-3">
        <img src={img} className="w-[80px] object-cover" />
        <div>
          <h3 className="font-bold line-clamp-1">title</h3>
          <p className="line-clamp-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat,
            non!
          </p>
        </div>
      </header>
      <div className=" w-[30%] p-2 flex flex-col justify-center items-center">
        <div className="flex justify-evenly p-1 text-[18px] w-full flex-col">
          Price : 2000
          <div>
            <span className="text-red-900 font-bold">Status : </span>
            <span className="text-white bg-green-600 px-3  rounded-full">
              Processing
            </span>
          </div>
        </div>

        <button
          className=" text-white font-bold px-3 rounded-md self-start bg-blue-700 active:bg-red-700 "
          onClick={() => {}}
        >
          Cancel Order
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
