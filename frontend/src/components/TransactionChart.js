import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  // Prepare data for the chart
  const incomeTotal = transactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const expenseTotal = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "₹ Transactions",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#4CAF50", "#F44336"], // Green for income, red for expenses
        hoverBackgroundColor: ["#45a049", "#e53935"],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Income vs Expenses</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default TransactionChart;
