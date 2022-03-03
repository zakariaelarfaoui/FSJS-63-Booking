import {Link} from "react-router-dom";

const ResetPassword = () => {
  return (
    <>
      <section className="login">
        <div className="login-left">
          <h1 className="text-center mt-5">Reset Password</h1>
          <form className="login-form">
            <div className="mb-3">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                required
                placeholder="Password"
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
}


export default ResetPassword;
