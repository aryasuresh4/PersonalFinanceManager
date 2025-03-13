import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";  
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/auth" element= {<Auth/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
