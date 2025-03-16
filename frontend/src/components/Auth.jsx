import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import '../Styles/AuthStyle.css';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError(null); // Clear errors on toggle
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    isSignIn
      ? setSignInData({ ...signInData, [name]: value })
      : setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!signUpData.username || !signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign-up failed!");

      alert("Sign-up successful! Please sign in.");
      setIsSignIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!signInData.username || !signInData.password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign-in failed!");

      localStorage.setItem("token", data.token);
      alert("Sign-in successful!");
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error) {
      setError(error.message);
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
                <input type="text" name="username" placeholder="Username" value={signInData.username} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={signInData.password} onChange={handleChange} />
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
                <input type="text" name="username" placeholder="Username" value={signUpData.username} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email Address" value={signUpData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={signUpData.confirmPassword} onChange={handleChange} />
                <input type="submit" value="Register" />
              </form>
            </div>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Auth;
