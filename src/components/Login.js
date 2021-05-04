import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-signup-component">
      <h1 className="col-start-2 col-span-4">Login</h1>
      <p className="col-start-2 col-span-4">
        Need an account?{" "}
        <b>
          <Link to="/sign-up">Sign up here</Link>
        </b>
      </p>
      <Link className="col-start-2 col-span-4 text-xs" to="/signup">
        Forgot your password?
      </Link>
      <form className="account-form">
        <input
          className="placeholder-gray-600"
          type="email"
          name="email"
          placeholder="Email address"
        />
        <input
          className="placeholder-gray-600"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="cursor-pointer button-colour"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Login;
