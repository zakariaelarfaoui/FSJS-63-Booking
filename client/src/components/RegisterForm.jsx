function RegisterForm({firstName, lastName, email, password, handelChange, handelRegister}) {
  return (
    <form className="login-form" onSubmit={handelRegister}>
      <div className="mb-3 d-flex justify-content-between gap-3">
        <input
          className="form-control"
          type="text"
          name="firstName"
          id="firstName"
          required
          placeholder="First Name"
          value={firstName}
          onChange={handelChange}
        />
        <input
          className="form-control"
          type="text"
          name="lastName"
          id="lastName"
          required
          placeholder="Last Name"
          value={lastName}
          onChange={handelChange}
        />
      </div>
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
      <input className="mt-3" type="submit" value="SIGN UP" />
    </form>
  );
}

export default RegisterForm