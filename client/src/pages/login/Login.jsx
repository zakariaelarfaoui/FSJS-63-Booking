import React from "react";
import "./style.css";

function Login() {
  return (
    <section className="login">
      <div className="login-left">
        <h1 className="text-center mt-5">Sign in now</h1>
        <form className="login-form">
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <a href="#" className="d-block">Forgot your password?</a>
          <input className="mt-3" type="submit" value="SIGN IN" />
        </form>
      </div>
      <div className="login-right">
        <h3 className="mt-5">Lorem, ipsum dolor.</h3>
        <p className="my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, modi?
        </p>
        <a className="mx-auto mt-3" href="#">
          SIGN UP
        </a>
      </div>
    </section>
  );
}

export default Login;
