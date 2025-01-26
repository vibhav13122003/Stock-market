import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import { axiosPortfolioValue } from "../utils/api";
import { userActions } from "../Store/Reducer/user";

const chartConfig = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Portfolio Value",
      data: [1000, 1500, 1200, 1800, 2000],
      borderColor: "#42A5F5",
      backgroundColor: "rgba(66, 165, 245, 0.5)",
      fill: true,
    },
  ],
};

export const PortfolioTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosPortfolioValue()
      .then((response) => {
        dispatch(userActions.setUsers(response.data));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(userActions.deleteUser(id));
  };

  return (
    <div>
      <h2 className='text-lg font-bold mb-4'>Portfolio Overview</h2>
      <Line data={chartConfig} />

      <TableContainer component={Paper} className='mt-6'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === "active" ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log("View", user.id)}>
                      View
                    </Button>
                    <Button onClick={() => console.log("Edit", user.id)}>
                      Edit
                    </Button>
                    <Button color='error' onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PortfolioTable;
