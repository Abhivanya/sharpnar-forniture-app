import React, { useContext } from "react";
import sampleImg from "./almira.jpg";
import { Button } from "react-bootstrap";
import ProductContext from "../store/productContext";
import { useNavigate } from "react-router-dom";
const Product = ({ productId, productDetails }) => {
  const navigate = useNavigate();
  const { removeProduct, updateProduct } = useContext(ProductContext);
  const { isOutofStock } = productDetails;

  let imageURL = `../../public/images/${productDetails.images}`;

  const handleUpdate = () => {
    navigate(`/updateproduct/${productId}`);
  };
  return (
    <li className="relative flex justify-evenly gap-3 px-3 py-2 bg-slate-300 rounded-md mb-2 hover:bg-slate-200 ">
      {isOutofStock && (
        <h1 className="absolute text-xl text-red-600 left-[45%] top-10 font-bold bg-white px-4 rounded-md">
          {" "}
          Product Out of stock
        </h1>
      )}

      <div className="w-[150px]  mx-auto">
        <img
          src={imageURL}
          alt="Not found"
          className="w-[110px] object-fill h-[100px]"
        />
      </div>

      <div className="w-[90%] flex flex-col gap-1">
        <span className="text-[14px] line-clamp-1">{productDetails.name}</span>
        <span className="line-clamp-1 text-[12px]">
          {productDetails.description}
        </span>
        <div className="text-red-600 font-bold">
          Category : {productDetails.category}
        </div>
        <div className="text-blue-600 font-bold">
          Price :{" "}
          <span className="text-green-500 mr-4">${productDetails.price}</span>
          Quantity :{" "}
          <span className="text-red-500">{productDetails.quantity}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="danger" onClick={() => removeProduct(productId)}>
          Delete
        </Button>
        <Button variant="warning" onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </li>
  );
};

export default Product;
