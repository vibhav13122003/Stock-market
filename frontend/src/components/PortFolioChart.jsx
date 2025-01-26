import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioChart = ({ watchlist, stockData }) => {
  // Prepare the data for the pie chart (stock distribution)
  const pieChartData = {    labels: watchlist.map((stock) => stock.name),
    datasets: [
      {
        data: watchlist.map(
          (stock) => stock.quantity * stockData[stock.ticker]?.price || 0
        ),
        backgroundColor: watchlist.map(
          () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        ), // Random colors
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  // Prepare the data for the line chart (stock price change over time)
  const lineChartData = {
    labels: Object.keys(stockData).map((ticker) => ticker),
    datasets: [
      {
        label: "Stock Price",
        data: Object.keys(stockData).map(
          (ticker) => stockData[ticker]?.price || 0
        ),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
      <h2 className='text-xl font-semibold text-white mb-4'>
        Stock Portfolio Overview
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {/* Pie Chart: Portfolio distribution */}
        <div className='col-span-1'>
          <h3 className='text-lg text-white mb-3'>Stock Distribution</h3>
          <Pie data={pieChartData} />
        </div>

        {/* Line Chart: Stock price changes */}
        <div className='col-span-1'>
          <h3 className='text-lg text-white mb-3'>Stock Price Over Time</h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;
