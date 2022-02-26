import React from "react";

function Login() {
  return (
    <section className="login">
      <div className="login-left">
        <h1>Sign in now</h1>
        <form>
            <input type="email" name="email" id="email" placeholder="Email" />
            <input type="password" name="password" id="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <input type="submit" value="SIGN IN" />
        </form>
      </div>
      <div className="login-right">
          <h2>Lorem, ipsum dolor.</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, modi?</p>
          <a href="#">SIGN UP</a>
      </div>
    </section>
  );
}

export default Login;
