import React from "react";
import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = emailRef.current.value;
    const adminPassword = passwordRef.current.value;
    if (adminEmail !== "admin@gmail.com" && adminPassword !== "admin@123") {
      alert("Wrong credentials");
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxuoPsUFDbD3OXA5b39Voc5n8Qs9Uh1jo",
      {
        method: "POST",
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message);
        }

        localStorage.setItem("admin", res.idToken);
        setIsLoggedIn(true);
        alert("SignIn Successfully");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });

    navigate("/");
    e.target.reset();
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
    <div className="flex justify-center items-center h-[100vh] ">
      <Form
        className="w-[50%] rounded-md p-4 border-2 shadow-lg gap-3 flex flex-col"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl  text-center font-bold">Admin Login</h1>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            required
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />
        </Form.Group>
        <Button type="submit">Login</Button>
        <p
          className="text-center cursor-pointer hover:underline text-blue-500"
          onClick={handleForget}
        >
          Forget Password?
        </p>
      </Form>
    </div>
  );
};

export default Login;
