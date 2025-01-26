import React from "react";

const MarketNews = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">Market News</h1>
          <a
            href="/"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Back to Dashboard
          </a>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Market News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-bold text-gray-700">Market Update</h3>
            <p className="text-sm text-gray-600 mt-2">
              Stocks rallied today led by strong tech earnings...
            </p>
            <a
              href="#readmore"
              className="text-blue-500 hover:underline mt-4 block"
            >
              Read more
            </a>
          </article>
          
        </div>
      </main>
    </div>
  );
};

export default MarketNews;
