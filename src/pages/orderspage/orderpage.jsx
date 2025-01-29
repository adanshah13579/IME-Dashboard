import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { getAllOffers } from "../../RestApi/creatOffer"; // Import the API call
import { baseuri } from "../../baseuri/baseuri";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#ff9800"; // Orange for Pending
    case "Completed":
      return "#4caf50"; // Green for Completed
    case "Accepted":
      return "#1976d2"; // Blue for Accepted
    case "Cancelled":
      return "#f44336"; // Red for Cancelled
    default:
      return "#000"; // Default to black if status is unknown
  }
};

const OrdersPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffersAndOrders = async () => {
      try {
        const response = await getAllOffers();
        console.log("Fetched response:", response); 

        const fetchedOffers = response.offers || [];
        setOffers(fetchedOffers);
        
        const fetchedOrders = fetchedOffers.map((offer) => ({
          id: offer._id, 
          name: offer.name, 
          profession: offer.profession, 
          orderStatus: offer.status, 
        }));
        setOrderData(fetchedOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOffersAndOrders();
  }, []);
  const handleStatusChange = async (newStatus) => {
    try {
      // Static offer ID (replace this with your desired static ID)
      const staticOfferId = '67972f77a95d6bbfad654360';
  
      // Check if the status is valid
      const validStatuses = ['Pending', 'Completed', 'Accepted', 'Cancelled'];
      if (!validStatuses.includes(newStatus)) {
        console.error("Invalid status selected");
        return;
      }
  
      // Static token to authenticate the request (you should replace it with a dynamic JWT token)
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTcyZjc3YTk1ZDZiYmZhZDY1NDM2MCIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE3MzgwNzI0MTEsImV4cCI6MTczODY3NzIxMX0.dW_Na8wKEWFozST8imY4bHv9gz_jEp8J3QeEE_t1BRA'; // Replace with your actual token
  
      // Sending the PUT request to update the status of the offer
      const response = await axios.put(
        `${baseuri}/api/offer/update-status`,
        {
          offerId: staticOfferId,   // Use static offer ID here
          status: newStatus,  // New status selected
        },
        {
          headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`,  // Attach the token in the Authorization header
          },
        }
      );
  
      if (response.data.success) {
        console.log("Offer status updated successfully");
        // Update the UI with the new status if necessary
        const updatedOrders = orderData.map((order) =>
          order.id === staticOfferId ? { ...order, orderStatus: newStatus } : order
        );
        setOrderData(updatedOrders); 
      } else {
        console.error("Failed to update offer status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating offer status:", error);
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
                    color: getStatusColor(order.orderStatus),
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
                      onChange={(e) => handleStatusChange( e.target.value)}
                      sx={{ width: "150px", height: "40px" }}
                    >
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
