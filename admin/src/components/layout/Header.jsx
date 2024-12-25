import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
const Header = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <Navbar fixed="top" className="bg-body-tertiary">
      <div className="bg-slate-100 py-2 rounded-md flex justify-between w-full px-10 ">
        <Navbar.Brand href="" className="text-2xl font-bold">
          <NavLink to="/">Admin Dashboard</NavLink>
        </Navbar.Brand>
        <Nav className="p-1 gap-5 items-center">
          <NavLink
            className="font-bold text-blue-500 text-xl underline-offset-2 "
            to="/addproduct"
          >
            Add Product
          </NavLink>
          <NavLink
            className="font-bold text-blue-500 text-xl underline-offset-2 "
            to="/order"
          >
            Order
          </NavLink>
          <Button type="button" variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
