import React from 'react';

import { Link } from 'react-router-dom';
import logo from '../assets/Spendlylogo3.png';
import '../Styles/LandStyle.css';
import Footer from '../pages/Footer';



const LandingPage = () => {
 
  return (
    <div className="landing">
      <nav className="navbars">
        {/* Logo */}
        <a href="#">
          <img src={logo} alt="Spendly Logo" className="logo-img" />
        </a>

        {/* Navbar Buttons */}
        <div className="navcontent">
          {/* <Link to='/dashboard'>
              <button className="dashboard">Dashboard</button>
          </Link> */}
          <Link to="/auth">   
            <button className="getstart">Get Started</button>
          </Link>
        </div>
      </nav>
      {/* nav ends here */}

      {/* main starts here */}
      <section className="landing-container">
        <h1 className="main-heading">Manage Your Expenses</h1>
        <h2 className="sub-heading">Grow Your Savings</h2>
        <p className="description">
          A simple way to track, budget, and save like a pro.
        </p>
        <Link to="/auth">  
            <button className="cta-button">Get Started</button>
        </Link>
      </section>

      <section className="features-section">
        <h2>Spendly Is Loaded With Free Features</h2>
        <div className="features-container">
          <div className="feature-box">
            <div className="icon">💰</div>
            <h3>Spend Smarter</h3>
            <p>Track your expenses wisely and make informed decisions.</p>
          </div>
          <div className="feature-box">
            <div className="icon">🌱</div>
            <h3>Budget Planner</h3>
            <p>Plan your budget effectively and save more money.</p>
          </div>
          <div className="feature-box">
            <div className="icon">📊</div>
            <h3>Track Growth</h3>
            <p>Monitor your financial growth and stay on top of your savings.</p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default LandingPage;
