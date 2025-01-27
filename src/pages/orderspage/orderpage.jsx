import React, { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, Select, MenuItem, InputLabel, Paper, Typography } from "@mui/material";

// Dummy data
const orders = [
  { id: 1, name: "John Doe", profession: "Doctor", orderStatus: "Pending" },
  { id: 2, name: "Jane Smith", profession: "Nurse", orderStatus: "Completed" },
  { id: 3, name: "Tom White", profession: "Surgeon", orderStatus: "Active" },
  { id: 4, name: "Mary Johnson", profession: "Therapist", orderStatus: "Cancelled" },
];

// Function to get color based on the order status
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#ff9800"; // Orange for Pending
    case "Completed":
      return "#4caf50"; // Green for Completed
    case "Active":
      return "#1976d2"; // Blue for Active
    case "Cancelled":
      return "#f44336"; // Red for Cancelled
    default:
      return "#000"; // Default to black if status is unknown
  }
};

const OrdersPage = () => {
  const [orderData, setOrderData] = useState(orders);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orderData.map((order) =>
      order.id === id ? { ...order, orderStatus: newStatus } : order
    );
    setOrderData(updatedOrders);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Profession</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Order Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Update Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>{order.name}</TableCell>
                <TableCell>{order.profession}</TableCell>
                <TableCell
                  sx={{
                    color: getStatusColor(order.orderStatus), // Set text color based on status
                    fontWeight: "bold",
                    padding: "8px 16px",
                  }}
                >
                  {order.orderStatus}
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      sx={{ width: "150px" ,height:"40px" }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersPage;
