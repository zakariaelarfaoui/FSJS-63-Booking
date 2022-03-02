import { Link } from "react-router-dom";

function LoginForm({ handelLogin, email, handelChange, password }) {
  return (
    <form className="login-form" onSubmit={handelLogin}>
      <div className="mb-3">
        <input
          className="form-control"
          type="email"
          name="email"
          id="email"
          required
          placeholder="Email"
          value={email}
          onChange={handelChange}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
          value={password}
          onChange={handelChange}
        />
      </div>
      <Link to="/forgot-password" className="d-block">
        Forgot your password?
      </Link>
      <input className="mt-3" type="submit" value="SIGN IN" />
    </form>
  );
}

export default LoginForm;
