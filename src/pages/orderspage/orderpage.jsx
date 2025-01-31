import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { getDoctorOffers, updateOfferStatus } from "../../RestApi/creatOffer";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#ff9800";
    case "completed":
      return "#4caf50";
    case "accepted":
      return "#1976d2";
    case "cancelled":
      return "#f44336";
    default:
      return "#000";
  }
};

const OrdersPage = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await getDoctorOffers();
        setOrderData(offers);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    fetchOffers();
  }, []);

  const handleStatusChange = async (offerId, newStatus) => {
    try {
      const success = await updateOfferStatus(offerId, newStatus);
      if (success) {
        setOrderData((prevOrders) =>
          prevOrders.map((order) =>
            order.id === offerId ? { ...order, orderStatus: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
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
              <TableRow key={order.id} sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}>
                <TableCell sx={{ fontWeight: "bold" }}>{order.name}</TableCell>
                <TableCell>{order.profession}</TableCell>
                <TableCell sx={{ color: getStatusColor(order.orderStatus), fontWeight: "bold" }}>
                  {order.orderStatus}
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select value={order.orderStatus} onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Accepted">Accepted</MenuItem>
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
