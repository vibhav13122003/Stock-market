import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; 
import Watchlist from "./Watchlist"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleProduct, updateFav } from "../../../Store/Actions/user";

const texts = ["Stock", "Invest", "Portfolio", "TrackPORT"];

const Dashboard = ({ userId }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoText, setLogoText] = useState("TrackPORT");
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(false); 
      setTimeout(() => {
        setLogoText(texts[index]);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length); 
        setIsTextVisible(true); 
      }, 1500); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [index]);
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`/api/portfolio/${userId}`);
        setPortfolio(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio:", error.message);
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <Navbar
        logoText={logoText}
        isTextVisible={isTextVisible}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        navigate={navigate}
      />

      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 text-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <ul>
              {portfolio.stocks.map((stock) => (
                <li key={stock.ticker} className="mb-2">
                  <span className="font-semibold">{stock.ticker}</span>: {stock.shares} shares
                </li>
              ))}
            </ul>
          </div>
        
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        <Watchlist />
      </section>

      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Market News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="bg-gray-800 text-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold">Breaking News: Market Rally</h3>
            <p className="text-sm text-gray-300 mt-2">
              Stocks surged today with tech leading the way...
            </p>
            <a
              href="#readmore"
              className="text-teal-500 hover:underline mt-4 block"
            >
              Read more
            </a>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
