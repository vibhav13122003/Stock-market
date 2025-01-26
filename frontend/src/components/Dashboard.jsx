import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  axiosPortfolioValue,
  axiosAssignRandom,
  axiosAddStock,
  axiosUpdateStock,
  axiosDeleteStock,
} from "../utils/api";
import { useNavigate } from "react-router-dom";
import { userActions } from "../Store/Reducer/user";
import { Sidebar } from "./Sidebar";
import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import StockChart from "./StockChart"; // Renamed the custom Chart component

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [username, setUsername] = useState("");
  const [hasCheckedPortfolio, setHasCheckedPortfolio] = useState(false);
  const [newStock, setNewStock] = useState({ ticker: "", shares: 0 });
  const [editStock, setEditStock] = useState(null);

  const user = useSelector((state) => state.user.user);
  const userId = user?.id || null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(userActions.CHANGE_LOGIN(null));
    navigate("/signup");
  };

  useEffect(() => {
    const assignRandom = async () => {
      try {
        if (userId && !hasCheckedPortfolio) {
          await axiosAssignRandom(userId);
          setHasCheckedPortfolio(true);
        }
      } catch (error) {
        if (
          error.response?.data?.error ===
          "Portfolio already exists for this user"
        ) {
          console.log("Portfolio already exists, skipping assignment.");
        } else {
          console.error("Error assigning random stocks:", error);
        }
      }
    };

    assignRandom();
  }, [userId, hasCheckedPortfolio]);

  useEffect(() => {
    const fetchPortfolioValue = async () => {
      try {
        if (userId) {
          const response = await axiosPortfolioValue(userId);
          setPortfolioValue(response.data.totalValue);
          setStocks(response.data.stocks || []);
        }
      } catch (error) {
        console.error("Error fetching portfolio value:", error);
      }
    };

    if (user) {
      setUsername(user.name);
    }

    fetchPortfolioValue();
  }, [userId, user]);

  const handleAddStock = async () => {
    if (!newStock.ticker.trim() || newStock.shares <= 0) {
      alert("Please enter valid stock data.");
      return;
    }
    try {
      const response = await axiosAddStock({ userId, ...newStock });
      if (response.data?.portfolio?.stocks) {
        setStocks(response.data.portfolio.stocks);
        const portfolioResponse = await axiosPortfolioValue(userId);
        setPortfolioValue(portfolioResponse.data.totalValue);
      }
      setNewStock({ ticker: "", shares: 0 });
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Failed to add stock. Please try again.");
    }
  };

  const handleUpdateStock = async () => {
    if (!editStock?.ticker || editStock.shares <= 0) {
      alert("Please enter valid stock data.");
      return;
    }
    try {
      const response = await axiosUpdateStock({ userId, ...editStock });
      if (response.data?.portfolio?.stocks) {
        setStocks(response.data.portfolio.stocks);
        const portfolioResponse = await axiosPortfolioValue(userId);
        setPortfolioValue(portfolioResponse.data.totalValue);
      }
      setEditStock(null);
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock. Please try again.");
    }
  };

  const handleDeleteStock = async (ticker) => {
    try {
      const response = await axiosDeleteStock({ userId, ticker });
      setStocks(response.data.updatedStocks || []);
      const portfolioResponse = await axiosPortfolioValue(userId);
      setPortfolioValue(portfolioResponse.data.totalValue);
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };
  const startDate = "2022-01-01"; // Example start date
  const endDate = "2022-12-31"; // Example end date

  return (
    <Box display='flex' minHeight='100vh' bgcolor='#121212' color='white'>
      <div className='flex flex-col w-64 bg-gray-800 text-white'>
        <Sidebar />
      </div>

      <Box flex={1} p={3}>
        <Typography variant='h4' gutterBottom>
          Welcome, {username || "Loading..."}
        </Typography>
        <Typography variant='h6' gutterBottom>
          Total Portfolio Value:{" "}
          {portfolioValue ? `$${portfolioValue}` : "Loading..."}
        </Typography>
        <Button variant='contained' color='error' onClick={handleSignOut}>
          Sign Out
        </Button>
        <Box my={3}>
          <TextField
            label='Ticker'
            value={newStock.ticker}
            onChange={(e) =>
              setNewStock({ ...newStock, ticker: e.target.value })
            }
            variant='filled'
            sx={{
              mr: 2,
              input: { color: "black", backgroundColor: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "lightgray",
                },
              },
            }}
          />
          <TextField
            label='Shares'
            type='number'
            value={newStock.shares}
            onChange={(e) =>
              setNewStock({
                ...newStock,
                shares: parseInt(e.target.value, 10) || 0,
              })
            }
            variant='filled'
            sx={{
              mr: 2,
              input: { color: "black", backgroundColor: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "lightgray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />

          <Button
            variant='contained'
            color='primary'
            onClick={handleAddStock}
            startIcon={<AddIcon />}
          >
            Add Stock
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>Shares</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell>{stock.shares}</TableCell>
                  <TableCell>
                    <IconButton
                      color='primary'
                      onClick={() => setEditStock(stock)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => handleDeleteStock(stock.ticker)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    Edit/Delete
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {editStock && (
          <Box mt={3}>
            <Typography variant='h6'>Edit Stock</Typography>
            <TextField
              label='Ticker'
              value={editStock.ticker}
              disabled
              variant='filled'
              sx={{
                mr: 2,
                input: { color: "black", backgroundColor: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "lightgray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <TextField
              label='Shares'
              type='number'
              value={editStock.shares}
              onChange={(e) =>
                setEditStock({
                  ...editStock,
                  shares: parseInt(e.target.value, 10) || 0,
                })
              }
              variant='filled'
              sx={{
                mr: 2,
                input: { color: "black", backgroundColor: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "lightgray",
                  },
                },
              }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleUpdateStock}
            >
              Update Stock
            </Button>
          </Box>
        )}
        <Box mt={5}>
          <StockChart
            ticker={stocks[0]?.ticker || ""}
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
