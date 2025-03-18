import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";  
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import AddTransaction from "./pages/AddTransaction";


function App() {
  return (
    
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/auth" element= {<Auth/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction/>} />
      </Routes>
    </Router>
  );
}

export default App;
