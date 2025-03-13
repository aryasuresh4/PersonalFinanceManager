import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/spendlylogo.png';
import '../Styles/Dash.css';

export default function Dashboard() {
  const { username } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddItem = (e) => {
    e.preventDefault();
    alert(`Added: ${taskName} - ₹${amount} (${category})`);
    setTaskName('');
    setAmount('');
    setCategory('');
    closeModal();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="left-dash">
        <a href="/">
          <img src={logo} alt="Spendly Logo" className="logo" width="120px" height="38px" />
        </a>
        <div className="logoMain">
          <a href="#" className="dash">Dashboard</a>
          <button className="add-button" onClick={openModal}>+ Add Item</button>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="dashboard-content">
        <h2 className="welcome-message">Welcome, {username}!</h2>

        <div className="stats-container">
          <div className="stat-box total-income"><h3>Total Income</h3><p>₹ --</p></div>
          <div className="stat-box total-expenses"><h3>Total Expenses</h3><p>₹ --</p></div>
         
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Item</h3>
            <form onSubmit={handleAddItem} className="new-item-form">
              <input 
                type="text" 
                placeholder="Task Name" 
                value={taskName} 
                onChange={(e) => setTaskName(e.target.value)} 
                required 
              />
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input 
                type="number" 
                placeholder="Enter Amount (₹)" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required 
              />
              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" className="close-button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
