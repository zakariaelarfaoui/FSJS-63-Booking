import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "../../api/axios";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../components/Modal";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handelResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      setSuccess(response.data.message)
      setError(false)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
        setSuccess(false)
      } else {
        console.log(error.message);
      }
    }
  };

  const props = {
    title: "Reset Password",
    icon: faCircleCheck,
    iconClassName: "d-block mt-3 mx-auto text-success",
    message: success,
    headerClassName: `popup-head text-center bg-success text-white`,
    btnClassName: `btn btn-outline-success `,
    btnContent: "Close",
    setSuccess,
    setError,
  };

  return (
    <>
      {success && <Modal {...props} />}
      <section className="login">
        <div className="login-left">
          <h1 className="text-center mt-5">Reset Password</h1>
          {error && (
            <div
              className="alert alert-danger text-center w-75 mx-auto"
              role="alert"
            >
              {error}
            </div>
          )}
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
