import React, { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../../components/Modal";

const ForgotPassword = () => {

  return (
    <>
      <section className="login">
        <div className="login-left">
          <h1 className="text-center mt-5">Forgot Password</h1>
          <form className="login-form" onSubmit={handelForgotPassword}>
            <div className="mb-3">
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Link className="mx-auto d-block" to="/login">
              Back to login
            </Link>
            <input className="mt-3" type="submit" value="Send" />
          </form>
        </div>
        <div className="login-right"></div>
      </section>
    </>
  );
};

export default ForgotPassword;
