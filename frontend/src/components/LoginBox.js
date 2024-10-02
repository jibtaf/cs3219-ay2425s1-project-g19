import React, { useState } from "react";
import { login } from "../api/AuthApi";
import "../css/authBox.css";
import eyeIcon from "../assets/view.png"; 
import eyeOffIcon from "../assets/hide.png"; 

const LoginBox = ({ onLogin }) => {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const handleLogin = async (event) => {
    event.preventDefault();
    document.getElementById("loginForm").reportValidity();

    const data = {
      email,
      password,
    };

    setLoading(true);
    try {
      console.log(data);
      const response = await login(data);
      setLoading(false);

      const isAdmin = response.data.isAdmin; 
      const token = response.data.accessToken;

      sessionStorage.setItem("isAuthenticated", true);
      sessionStorage.setItem("isAdmin", isAdmin);
      sessionStorage.setItem("token", token);

      onLogin();      
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(`Failed to log in: ${error.message}`);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="authContainer d-flex flex-column align-items-center">
      <h1>Log In</h1>
      <p className="text-muted">Log in to your account to continue</p>

      <form id="loginForm" onSubmit={handleLogin} className="w-100">
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

        <div className="mb-4 position-relative">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"} 
            id="password"
            className="form-control"
            placeholder="Your Password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button" 
            className="password-toggle-btn" 
            onClick={togglePasswordVisibility} 
            style={{ position: "absolute", right: "10px", top: "35px", background: "none", border: "none", cursor: "pointer" }}
          >
            <img 
              src={isPasswordVisible ? eyeIcon : eyeOffIcon} 
              alt={isPasswordVisible ? "Hide password" : "Show password"} 
              style={{ width: "18px", height: "18px", opacity:"0.5" }} 
            />
          </button>
        </div>

        <button type="submit" className="btn w-100">
          Log In
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginBox;