import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { logoutAction } from "../../store/authActions";
import SearchProductCard from "../SearchProductCard";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const totalCount = useSelector((state) => state.cart.totalCount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for search query and results
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchProduct = () => {
      fetch(
        `https://furniture-app-5c355-default-rtdb.firebaseio.com/products.json`
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
          setProducts(res);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    };
    fetchProduct();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = Object.entries(products).filter(([key, item]) =>
        item.name.toLowerCase().includes(query)
      );
      // console.log(results);
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };
  const handleSearchItemClick = (productId) => {
    navigate(`/product/${productId}`);
    setFilteredResults([]);
    setSearchQuery("");
  };

  return (
    <Navbar fixed="top" className="bg-black">
      <div className="bg-orange-800 py-2 rounded-md flex justify-between w-full px-10">
        <Navbar.Brand href="" className="text-2xl text-white font-bold">
          <NavLink to="/">Furniture Store</NavLink>
        </Navbar.Brand>
        <Nav className="p-1 gap-5 w-[70%] items-center justify-between">
          <div className="relative w-full md:w-[40%]">
            <div className="flex bg-white rounded-2xl pl-1 pr-1 md:h-8 w-full">
              <input
                type="text"
                placeholder="Search for items"
                className="border-none rounded-2xl w-full outline-none text-black pl-3"
                value={searchQuery}
                onChange={handleSearch}
              />
              <IoIosSearch size={"30px"} className="text-gray-400" />
            </div>

            {filteredResults.length > 0 && (
              <div className="absolute bg-white border text-black border-gray-300 w-full rounded-md shadow-md mt-1 z-50">
                {filteredResults.map(([key, product]) => (
                  <SearchProductCard
                    key={key}
                    product={product}
                    productId={key}
                    handleRedirect={handleSearchItemClick}
                  />
                ))}
              </div>
            )}
          </div>

          {!isLoggedIn ? (
            <NavLink className="text-bold underline-offset-2" to="/loginsignup">
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
