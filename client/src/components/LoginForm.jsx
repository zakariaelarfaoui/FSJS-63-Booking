import { Link } from "react-router-dom";

function LoginForm({
  email,
  password,
  rememberMe,
  setRememberMe,
  handelChange,
  handelLogin,
}) {
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
      <div>
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
      <div className="d-flex">
        <input
          className="ms-2 me-1"
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe((prev) => !prev)}
        />
        <label htmlFor="rememberMe">Remember Me</label>
        <Link to="/forgot-password" className="ms-auto">
          Forgot your password?
        </Link>
      </div>
      <input className="mt-3" type="submit" value="SIGN IN" />
    </form>
  );
}

export default LoginForm;
