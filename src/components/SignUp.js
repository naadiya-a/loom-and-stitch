import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="login-signup-component">
      <h1 className="col-start-2 col-span-4">Sign Up</h1>
      <p className="col-start-2 col-span-4">
        Already have an account?{" "}
        <b>
          <Link to="/login">Login here</Link>
        </b>
      </p>
      <form className="account-form">
        <input
          className="placeholder-gray-600"
          type="text"
          name="name"
          placeholder="Full name"
        />
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
          className="placeholder-gray-600"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
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

export default SignUp;
