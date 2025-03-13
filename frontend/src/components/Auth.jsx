import React, { useState } from "react";
import '../Styles/AuthStyle.css';
const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="auth-container"> {/* Ensure this class has CSS */}
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
             <form>
                  <i className="bx bx-log-in signinimage"></i> 
                  <h3>Sign In</h3>
                  <input type="text" placeholder="Username" />
                  <input type="password" placeholder="Password" />
                  <input type="submit" value="Login" />
                  
                  <div className="links-container">
                    <a href="#" className="forgot">Forgot Password?</a>
                    <a href="/" className="back">Back to Home</a>
                  </div>
              </form>

            </div>
          ) : (
            <div className="form signupForm">
              <form>
                <i className="bx bxs-user signupimage"></i> 
                <h3>Sign Up</h3>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
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
