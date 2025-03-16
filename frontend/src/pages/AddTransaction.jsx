import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState({
    taskName: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  const handleChange = (e) => {
    setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = async () => {
    try {
      console.log("🟡 Sending transaction data:", transactionData);
      const response = await axios.post("http://localhost:5000/api/transactions", transactionData);
      console.log("✅ Transaction added:", response.data);
      navigate("/transactions"); // Redirect after successful add
    } catch (error) {
      console.error("❌ Error adding transaction:", error.message);
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <input type="text" name="taskName" placeholder="Enter task name" onChange={handleChange} />
      <input type="number" name="amount" placeholder="Enter amount" onChange={handleChange} />
      <input type="text" name="category" placeholder="Enter category" onChange={handleChange} />
      <select name="type" onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="date" name="date" onChange={handleChange} />
      <button onClick={handleAddTransaction}>Add Transaction</button>
    </div>
  );
};

export default AddTransaction;
