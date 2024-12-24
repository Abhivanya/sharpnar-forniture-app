import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction, singupAction } from "../store/authActions";

const LoginSignup = () => {
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const signupEmailRef = useRef();
  const signupPasswordRef = useRef();
  const signupConfirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = loginEmailRef.current.value;
    const password = loginPasswordRef.current.value;

    dispatch(loginAction(email, password));
    if (isLoggedIn) {
      navigate("/");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const email = signupEmailRef.current.value;
    const password = signupPasswordRef.current.value;
    const confirmPassword = signupConfirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(singupAction(email, password));
    if (isLoggedIn) {
      navigate("/");
    }
  };

  const handleForget = () => {
    const enterdEmail = prompt("Enter your email");
    if (!enterdEmail) return;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDxuoPsUFDbD3OXA5b39Voc5n8Qs9Uh1jo",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enterdEmail,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.err) {
          throw new Error(res.error);
        }
        console.log(res);

        alert("Passwerd reset Link is set To your Email");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-blue-500 flex flex-col gap-6 lg:flex-row justify-evenly items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 py-auto w-[80%] lg:w-1/3 mb-6 lg:mb-0 mx-2  h-[350px]">
        <h2 className="text-center text-2xl text-orange-800 font-bold mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              ref={loginEmailRef}
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              ref={loginPasswordRef}
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-800 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div
          className="underline text-center text-blue-800 mt-3 cursor-pointer"
          onClick={handleForget}
        >
          Forget Password ?
        </div>
      </div>

      {/* Signup Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-[80%] mb-10 md:mb-0 h-[350px] lg:w-1/3 mx-2">
        <h2 className="text-center text-orange-800 text-2xl font-bold mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              ref={signupEmailRef}
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              ref={signupPasswordRef}
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              ref={signupConfirmPasswordRef}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-800 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
