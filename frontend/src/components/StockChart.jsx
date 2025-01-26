// components/StockChart.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getStockDataForChart } from "../utils/api"; // Adjusted API import

const StockChart = ({ ticker, startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      if (!ticker || !startDate || !endDate) return; // Ensure ticker and dates are provided

      try {
        const data = await getStockDataForChart(ticker, startDate, endDate);

        const chartLabels = data.map((item) =>
          new Date(item.date).toLocaleDateString()
        );
        const chartDataset = data.map((item) => item.closePrice.toFixed(2));

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: `${ticker} Stock Price`,
              data: chartDataset,
              borderColor: "rgba(75, 192, 192, 1)",
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [ticker, startDate, endDate]); // Re-fetch when ticker or dates change

  return chartData ? (
    <Line data={chartData} />
  ) : (
    <div>Loading stock chart...</div>
  );
};

export default StockChart;
