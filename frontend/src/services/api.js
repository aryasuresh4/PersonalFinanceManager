// // import axios from "axios";

// // // Set your backend API URL
// // const API_URL = "http://localhost:5000";


// // // Sign Up
// // export const signUp = async (userData) => {
// //   return axios.post(`${API_URL}/api/users/signup`, userData);
// // };

// // // Sign In
// // export const signIn = async (userData) => {
// //   return axios.post(`${API_URL}/api/users/signin`, userData);
// // };


// // // Get Transactions (Requires Token)
// // export const getTransactions = async (token) => {
// //   return axios.get(`${API_URL}/api/transactions`, {
// //     headers: { Authorization: `Bearer ${token}` },
// //   });
// // };
// // // Add Transaction (Requires Token)
// // export const addTransaction = async (transactionData, token) => {
// //   return axios.post(`${API_URL}/api/transactions/add`, transactionData, {
// //     headers: { Authorization: `Bearer ${token}` },
// //   });
// // };



// // // Function to delete a transaction by ID
// // export const deleteTransaction = async (id) => {
// //   try {
// //     const response = await axios.delete(`${API_URL}/${id}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error deleting transaction:", error);
// //     return null;
// //   }
// // };

// import axios from "axios";

// // Set your backend API URL
// const API_URL = "http://localhost:5000";

// // Sign Up
// export const signUp = async (userData) => {
//   try {
//       console.log("Sending Sign Up Request with Data:", userData); // Log the data being sent

//       const response = await axios.post("http://localhost:5000/api/users/signup", userData, {
//           headers: {
//               "Content-Type": "application/json",
//           },
//       });

//       console.log("Sign Up Success:", response.data); // Log response from backend
//       return response;
//   } catch (error) {
//       console.error("Sign Up Failed:", error);

//       if (error.response) {
//           console.log("Error Status:", error.response.status);
//           console.log("Error Data:", error.response.data);
//       } else {
//           console.log("No response received from server");
//       }

//       throw error;
//   }
// };



// // Sign In
// export const signIn = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/api/users/signin`, userData);
//     console.log("Sign In Success:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Sign In Failed:", error.response ? error.response.data : error.message);
//     return null;
//   }
// };

// // Get Transactions (Requires Token)
// export const getTransactions = async (token) => {
//   return axios.get(`${API_URL}/api/transactions`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Add Transaction (Requires Token)
// export const addTransaction = async (transactionData, token) => {
//   return axios.post(`${API_URL}/api/transactions/add`, transactionData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Function to update a transaction by ID
// export const updateTransaction = async (id, updatedData, token) => {
//   return axios.put(`${API_URL}/api/transactions/update/${id}`, updatedData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Function to delete a transaction by ID
// export const deleteTransaction = async (id, token) => {
//   try {
//     const response = await axios.delete(`${API_URL}/api/transactions/delete/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting transaction:", error);
//     return null;
//   }
// };

// // Function to fetch user profile (Requires Token)
// export const getUserProfile = async (token) => {
//   return axios.get(`${API_URL}/api/users/profile`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // Function to log out (Client-side)
// export const logout = () => {
//   localStorage.removeItem("token");
// };


import axios from "axios";

// Backend API URL
const API_URL = "http://localhost:5000";



export const signUp = async (userData) => {
  try {
    console.log("Sending Sign Up Request with Data:", userData);
    
    const response = await axios.post(`${API_URL}/api/auth/signup`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Sign Up Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Sign Up Failed:", error?.response?.data || error.message);
    throw error;
  }
};

// Sign In
export const signIn = async (userData) => {
  try {
    console.log("Attempting Sign In with:", userData);

    const response = await axios.post(`${API_URL}/api/auth/signin`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Sign In Success:", response.data);
    return response.data; // Includes user token
  } catch (error) {
    console.error("Sign In Failed:", error?.response?.data || error.message);
    throw error;
  }
};

//       TRANSACTION API


// Get All Transactions (Requires Token)
export const getTransactions = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/api/transactions", {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Correct syntax
    });
    
    

    console.log("Fetched Transactions:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error?.response?.data || error.message);
    return [];
  }
};

// Add Transaction (Requires Token)
export const addTransaction = async (transactionData, token) => {
  try {
    const response = await axios.post(API_BASE_URL, transactionData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error adding transaction:", error);
    throw error;
  }
};;

// Update Transaction (Requires Token)
export const updateTransaction = async (id, updatedData, token) => {
  try {
    const response = await axios.put(`${API_URL}/api/transactions/update/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    console.log("Transaction Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error?.response?.data || error.message);
    throw error;
  }
};

// Delete Transaction (Requires Token)
export const deleteTransaction = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/api/transactions/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Transaction Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error?.response?.data || error.message);
    throw error;
  }
};

// ===============================
//       USER PROFILE API
// ===============================

// Fetch User Profile (Requires Token)
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Fetched User Profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error?.response?.data || error.message);
    throw error;
  }
};

// Logout (Client-Side)
export const logout = () => {
  localStorage.removeItem("token");
  
  console.log("User logged out.");
};