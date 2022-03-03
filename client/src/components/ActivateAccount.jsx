import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "../api/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function ActivateAccount() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useParams();
  useEffect(() => {
    const activeAccount = async () => {
      try {
        const response = await axios.get(`/activate-account/${token}`);
        setSuccess((prevState) => response.data.message);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          setError(error.response.data.message);
        }
      }
    };
    activeAccount();
  }, []);

  return (
    <div className="popup">
      <div className="popup-content">
        <header
          className={`popup-head text-center text-black ${
            success ? "bg-success text-white" : "bg-warning"
          }`}
        >
          Account Activation
        </header>
        {success ? (
          <div className="popup-body">
            <FontAwesomeIcon
              icon={faCircleCheck}
              size="4x"
              className="text-success d-block mt-3 mx-auto"
            />
            <br />
            <p className="text-center">{success}</p>
          </div>
        ) : (
          <div className="popup-body">
            <FontAwesomeIcon
              icon={faCircleInfo}
              size="4x"
              className="text-warning d-block mt-3 mx-auto"
            />
            <br />
            <p className="text-center">{error}</p>
          </div>
        )}
        <footer className="py-3 text-center">
          <Link
            className={`btn ${
              success ? "btn-outline-success" : "btn-outline-warning"
            }`}
            to="/login"
          >
            Go to Login page
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default ActivateAccount;
