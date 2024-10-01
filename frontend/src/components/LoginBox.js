import React, { useState } from "react";
import "../css/loginBox.css";

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="loginContainer d-flex flex-column align-items-center">
      <h1>Log In</h1>
      <p className="text-muted">Log in to your account to continue.</p>

      <form onSubmit={handleLogin} className="w-100">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Your Email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Your Password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn w-100">
          Log In
        </button>
      </form>

      <div className="mt-3 text-center">
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginBox;
