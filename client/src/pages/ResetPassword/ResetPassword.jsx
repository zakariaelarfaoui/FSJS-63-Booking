import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "../../api/axios";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handelResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.error(error.message);
      }
    }
  };
  return (
    <>
      <section className="login">
        <div className="login-left">
          <h1 className="text-center mt-5">Reset Password</h1>
          <form className="login-form" onSubmit={handelResetPassword}>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
