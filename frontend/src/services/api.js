import axios from "axios";

// Set your backend API URL
const API_URL = "http://localhost:5000/api/transactions";

// Function to fetch all transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// Function to add a new transaction
export const addTransaction = async (transaction) => {
  try {
    const response = await axios.post(API_URL, transaction);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    return null;
  }
};

// Function to delete a transaction by ID
export const deleteTransaction = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return null;
  }
};
