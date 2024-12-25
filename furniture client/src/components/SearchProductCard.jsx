import React from "react";
import { useNavigate } from "react-router-dom";

const SearchProductCard = ({ product, productId, handleRedirect }) => {
  const navigate = useNavigate();

  return (
    <div
      key={productId}
      onClick={() => handleRedirect(productId)}
      className="p-1 m-1 cursor-pointer px-2 border-2 flex gap-3 "
    >
      <div>
        <img
          src={`../../public/images/${product.images}`}
          className="h-[45px] w-[45px]"
        />
      </div>
      <div className="flex justify-between w-full pr-1">
        <div>
          <div className="font-bold">{product.name}</div>
          <div className="text-gray-500">{product.description}</div>
        </div>
        <div className="justify-self-end text-green-700 font-bold">
          Rs {product.price}
        </div>
      </div>
    </div>
  );
};

export default SearchProductCard;
