import { useState } from "react";
import { Link } from "react-router-dom";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import axios from "../../api/axios";

import RegisterForm from "../../components/RegisterForm";
import Popup from "../../components/Popup";

import "./style.css";

function Register() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = user;

  const handelChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(user);

  const handelRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", user);
      setSuccess(response.data.message);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
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
    <section className="register">
      {success && (
        <Popup
          faCircleCheck={faCircleCheck}
          success={success}
          setSuccess={setSuccess}
        />
      )}

      <div className="register-left">
        <h3 className="mt-5">Lorem, ipsum dolor.</h3>
        <p className="my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, modi?
        </p>
        <Link to="/login" className="mx-auto mt-3">
          SIGN IN
        </Link>
      </div>
      <div className="register-right">
        <h1 className="text-center">Sign up now</h1>
        {error && (
          <div
            className="alert alert-danger text-center w-75 mx-auto"
            role="alert"
          >
            {error}
          </div>
        )}
        <RegisterForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          handelChange={handelChange}
          handelRegister={handelRegister}
        />
      </div>
    </section>
  );
}

export default Register;
