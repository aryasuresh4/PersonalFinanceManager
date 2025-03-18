import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { signUp, signIn } from "../services/api"; // Import authentication functions
import "../Styles/AuthStyle.css"; // Keep your styling

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isSignIn) {
      setSignInData({ ...signInData, [name]: value });
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
  };

  // ✅ Sign-Up Function with Popup Messages
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!signUpData.name || !signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Please fill in all fields!",
        });
        return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Passwords do not match!",
        });
        return;
    }

    try {
        const response = await signUp({
            username: signUpData.name, // Ensure field names match backend
            email: signUpData.email,
            password: signUpData.password,
        });

        if (!response || !response.data) {
            throw new Error("Unexpected empty response from server");
        }

        console.log("Full Response:", response);
        console.log("Full Response Data:", JSON.stringify(response?.data, null, 2));

        Swal.fire({
            icon: "success",
            title: "Success!",
            text: response.data.message || "Sign-up successful! Please sign in.",
        });

        setIsSignIn(true);
    } catch (error) {
      console.log("Error:", error); // Log full error object
      console.log("Error Response:", error.response); // Log error response if available
      console.log("Error Data:", error.response?.data); // Log response data if present
      
      Swal.fire({
        icon: "error",
        title: "Sign-up Failed",
        text: error.response?.data?.message || "Something went wrong! Please check the console for details.",
      });
  }
};


  // ✅ Sign-In Function with Popup Messages
  
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
  
    if (!signInData.email || !signInData.password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter both email and password!",
      });
      return;
    }
  
    try {
      const response = await signIn(signInData);
  
      // Log the response object to understand the structure
      console.log("Full Response:", response);
      console.log("Full Response Data:", JSON.stringify(response, null, 2)); // Directly log the full response
  
      // Access token directly, without response.data
      const token = response.token; // Fix: Access token directly from response
  
      if (!token) {
        throw new Error("Token not received from server");
      }
  
      localStorage.setItem("token", token); // Store token in localStorage
  
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Sign-in successful!",
        timer: 2000,
        showConfirmButton: false,
      });
  
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Sign-in Failed",
        text: error.response?.data?.message || "Invalid credentials!",
      });
    }
  };
  

  return (
    <div className="auth-container">
      <div className={`container ${isSignIn ? "" : "active"}`}>
        <div className="bluebg">
          <div className="box signin">
            <h2>Already Have an Account?</h2>
            <button className="signinbtn" onClick={toggleForm}>Sign In</button>
          </div>
          <div className="box signup">
            <h2>Don't Have an Account?</h2>
            <button className="signupbtn" onClick={toggleForm}>Sign Up</button>
          </div>
        </div>

        <div className="formBx">
          {isSignIn ? (
            <div className="form signinForm">
              <form onSubmit={handleSignInSubmit}>
                <h3>Sign In</h3>
                <input type="email" name="email" placeholder="Email" value={signInData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={signInData.password} onChange={handleChange} required />
                <input type="submit" value="Login" />
                <div className="links-container">
                  <a href="#" className="forgot">Forgot Password?</a>
                  <a href="/" className="back">Back to Home</a>
                </div>
              </form>
            </div>
          ) : (
            <div className="form signupForm">
              <form onSubmit={handleSignUpSubmit}>
                <h3>Sign Up</h3>
                <input type="text" name="name" placeholder="Full Name" value={signUpData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email Address" value={signUpData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={signUpData.confirmPassword} onChange={handleChange} required />
                <input type="submit" value="Register" />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
