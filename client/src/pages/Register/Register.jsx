
import {Link} from "react-router-dom";

import RegisterForm from "../../components/RegisterForm";

import "./style.css";

function Register() {
  return (
    <section className="register">
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
        <h1 className="text-center mt-5">Sign up now</h1>
        <RegisterForm />
      </div>
    </section>
  );
}

export default Register;
