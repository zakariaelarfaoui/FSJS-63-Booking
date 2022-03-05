import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";

import LoginForm from "../../components/LoginForm";

import "./style.css";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(null);
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;

  const handelChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", user, {
        withCredentials: true,
      });
      const { accessToken } = response.data;
      const payload = jwt_decode(accessToken);
      const { _id, email, firstName, lastName, role } = payload;
      const from = location.state?.from?.pathname
      ? location.state?.from?.pathname
      : role === "admin" || role === "owner"
      ? "/dashboard"
      : "/";

      setAuth({ _id, email, firstName, lastName, role, accessToken });
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
  return (
    <section className="login">
      <div className="login-left">
        <h1 className="text-center mt-5">Sign in now</h1>
        {error && (
          <div
            className="alert alert-danger text-center w-75 mx-auto"
            role="alert"
          >
            {error}
          </div>
        )}
        <LoginForm
          handelLogin={handelLogin}
          email={email}
          handelChange={handelChange}
          password={password}
        />
      </div>
      <div className="login-right">
        <h3 className="mt-5">Lorem, ipsum dolor.</h3>
        <p className="my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, modi?
        </p>
        <Link to="/register" className="mx-auto mt-3">
          SIGN UP
        </Link>
      </div>
    </section>
  );
}

export default Login;
