import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { logoutAction } from "../../store/authActions";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const dispatch = useDispatch();

  return (
    <Navbar fixed="top" className="bg-black">
      <div className="bg-orange-800 py-2 rounded-md flex justify-between w-full px-10 ">
        <Navbar.Brand href="" className="text-2xl text-white font-bold">
          <NavLink to="/">Forniture Store</NavLink>
        </Navbar.Brand>
        <Nav className="p-1 gap-5 w-[70%] items-center justify-between">
          <div className="flex bg-white rounded-2xl pl-1 pr-1 md:w-[40%] md:h-8 w-[60%]">
            <input
              type="text"
              placeholder="Search for items"
              className="border-none rounded-2xl  w-[92%]  outline-none text-gray-400 pl-3"
            />
            <IoIosSearch size={"30px"} className="text-gray-400 " />
          </div>
          {!isLoggedIn ? (
            <NavLink
              className="text-bold underline-offset-2 "
              to="/loginsignup"
            >
              Login / Register
            </NavLink>
          ) : (
            <div className="flex gap-3 items-center">
              <Link to="/cart" className="relative">
                <span className="absolute -top-2 font-bold rounded-full py-0 px-1 text-[12px] -right-1 bg-white text-red-600">
                  {totalCount}
                </span>
                <IoCartOutline className="rounded-full text-black bg-gray-200 cursor-pointer hover:border-gray-300 hover:border-2 p-1 text-3xl" />
              </Link>

              <CiLogout
                onClick={() => dispatch(logoutAction())}
                className="rounded-full hover:bg-red-400 text-black bg-gray-200 cursor-pointer p-1 text-3xl"
              />
            </div>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
