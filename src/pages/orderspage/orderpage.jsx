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

// Updated getStatusColor to use correct status and color mapping
const getStatusColor = (status) => {
  if (!status) return "#000"; // Default color for missing status

  const statusColors = {
    Active: "blue",
    Completed: "green",
    
    Cancelled: "red",
  };

  return statusColors[status] || "#000"; // Default to black if status is unknown
};

const OrdersPage = () => {
  const [orderData, setOrderData] = useState([]);

  // Fetch offers on page load
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

  // Handle status change and update state immediately
  const handleStatusChange = async (offerId, newStatus) => {
    console.log(`Updating offer ${offerId} to status: ${newStatus}`);
    
    try {
      const success = await updateOfferStatus(offerId, newStatus);
      
      if (success) {
        // Update the status in the frontend state directly
        setOrderData((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === offerId) {
              console.log('Updating order status:', order, newStatus); // Debugging line
              return { ...order, status: newStatus };
            }
            return order;
          })
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
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 ,background:"linear-gradient(145deg, #F4FBFF, #FFFFFF)"}}>
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
                key={order._id}
                sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}
              >
                <TableCell sx={{ fontWeight: "bold" }}>{order.name}</TableCell>
                <TableCell>{order.profession}</TableCell>
                <TableCell
                  sx={{
                    color: getStatusColor(order.status),
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
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
