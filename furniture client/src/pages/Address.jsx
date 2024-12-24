import { asyncThunkCreator } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartItems, getCartItems } from "../store/cartActions";
const Address = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [fetchAddress, setFetchAddress] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState();
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { email } = JSON.parse(localStorage.getItem("forniture-app"));
      const emailId = email.replace(".", "_");

      try {
        const response = await fetch(
          `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/address.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const res = await response.json();
        console.log(res);
        if (!res) return;
        setUserInfo(res);
        setIsFormOpen(false);
      } catch (err) {
        console.error("Error fetching cart items:", err.message);
      }
    };
    fetchData();
  }, [fetchAddress]);

  const addUserDetails = async (e) => {
    e.preventDefault();
    console.log();
    console.log();
    console.log(addressRef.current.value);
    console.log();
    console.log(stateRef.current.value);
    console.log(zipRef.current.value);
    try {
      const { email } = JSON.parse(localStorage.getItem("forniture-app"));
      const emailId = email.replace(".", "_");

      const response = await fetch(
        `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/address.json`,
        {
          method: "POST",
          body: JSON.stringify({
            name: nameRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            zip: zipRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add/update cart item");
      }

      const res = await response.json();
      console.log(res);
      alert("Address added");
    } catch (err) {
      console.error("Error in addToCart:", err.message);
    }
    e.target.reset();
    setIsFormOpen(false);
    setFetchAddress(!fetchAddress);
  };

  const handleOrder = async () => {
    if (!selectedAddress) {
      alert("choose or Add an address");
      return;
    }
    if (!isChecked) {
      alert("Select payment Option");
      return;
    }

    try {
      const { email } = JSON.parse(localStorage.getItem("forniture-app"));
      const emailId = email.replace(".", "_");

      const response1 = await fetch(
        `https://furniture-app-5c355-default-rtdb.firebaseio.com/${emailId}/order.json`,
        {
          method: "POST",
          body: JSON.stringify({ order: cartItems, amount: totalAmount }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response2 = await fetch(
        `https://furniture-app-5c355-default-rtdb.firebaseio.com/orders.json`,
        {
          method: "POST",
          body: JSON.stringify({
            order: cartItems,
            amount: totalAmount,
            custmerEmail: email,
            custmerEmailId: emailId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response1.ok) {
        throw new Error("Failed to place Order");
      }
      if (!response2.ok) {
        throw new Error("Failed to place Order to Seller");
      }

      const res = await response1.json();
      console.log(res);

      dispatch(clearCartItems());

      alert("Order Place");
      navigate("/cart");
    } catch (err) {
      console.error("Error in addToCart:", err.message);
    }
  };
  return (
    <Container fluid className="rounded-md mt-[80px] p-0 md:w-[80%] ">
      <div className=" md:mx-auto flex flex-col gap-2 justify-between  items-center ">
        <h1 className="text-2xl m-4 font-bold underline underline-offset-4">
          User Information
        </h1>
        <div className="relative w-full min-h-[90px] border-t-2">
          {isFormOpen ? (
            <Form
              className="border-2 p-4 mb-8 rounded-md"
              onSubmit={addUserDetails}
            >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter Name"
                    ref={nameRef}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="phone">
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                    required
                    className="border rounded px-2 py-1"
                    ref={phoneRef}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  ref={addressRef}
                  required
                  placeholder="1234 Main St"
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control required ref={cityRef} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select required ref={stateRef} className="mb-3">
                    <option value="" disabled hidden>
                      Select a state
                    </option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujrat">Gujrat</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Haryana">Haryana</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control required ref={zipRef} />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit">
                Add Address
              </Button>
            </Form>
          ) : (
            <Button
              variant="primary"
              className="absolute right-2 top-4"
              onClick={() => setIsFormOpen(true)}
            >
              Add New Address
            </Button>
          )}
        </div>
        <ul className="flex flex-col w-full my-4 mx-auto border-2 p-8 ">
          <h1 className="text-center my-5 w-[40%] mx-auto text-2xl font-bold bg-white p-2 rounded-md text-green-800 underline  ">
            Choose Address
          </h1>
          {Object.entries(userInfo).length > 0 &&
            Object.entries(userInfo).map(([key, address]) => (
              <li
                key={key}
                onClick={() => setSelectedAddress(key)}
                className={`cursor-pointer border rounded-lg p-4 shadow mb-2 hover:shadow-md ${
                  selectedAddress === key
                    ? "border-blue-500 bg-green-400"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div className="text-lg font-bold text-black mb-2">
                  {address.name}{" "}
                  <span className="text-sm ml-4 font-medium text-gray-600">
                    ({address.phone})
                  </span>
                </div>
                <div className="text-gray-700 text-sm font-bold mb-1">
                  {address.address}
                </div>
                <div className="text-gray-600 text-sm">
                  {address.city}, {address.state}, {address.zip}
                </div>
              </li>
            ))}
        </ul>

        <div className="flex flex-col w-full my-4 mx-auto border-2 p-8 ">
          <h1 className="text-center my-5 w-[40%] mx-auto text-2xl font-bold bg-white p-2 rounded-md text-green-800 underline  ">
            Payment Type
          </h1>
          <Form.Check
            className="border-2 bg-white text-black  p-8 flex gap-3 font-bold"
            onChange={() => setIsChecked(!isChecked)}
            checked={isChecked}
            type="radio"
            label="Cash on Delivery"
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
          />
        </div>
      </div>
      <div className="flex justify-center my-4">
        <Button className="text-xl mx-auto font-bold " onClick={handleOrder}>
          Place Order
        </Button>
      </div>
    </Container>
  );
};

export default Address;
