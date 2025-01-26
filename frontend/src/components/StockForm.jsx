import React, { useState, useEffect } from "react";

const StockForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    quantity: "",
    buyPrice: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        ticker: "",
        quantity: "",
        buyPrice: "",
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      ticker: "",
      quantity: "",
      buyPrice: "",
    }); // Reset form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-gray-800 shadow-md rounded-lg p-6 transform transition duration-300 hover:scale-102"
    >
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">
        {initialData ? "Edit Stock" : "Add Stock"}
      </h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Stock Name"
          value={formData.name}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
        <input
          type="text"
          name="ticker"
          placeholder="Ticker (e.g., AAPL)"
          value={formData.ticker}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
        <input
          type="number"
          name="buyPrice"
          placeholder="Buy Price"
          value={formData.buyPrice}
          onChange={handleInputChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-2 w-32 mx-auto rounded-md hover:bg-green-600 transition duration-200"
        >
          {initialData ? "Update Stock" : "Add Stock"}
        </button>
      </div>
    </form>
  );
};

export default StockForm;
