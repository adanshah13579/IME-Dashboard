import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Box, Button } from "@mui/material";
import axios from "axios";  // Import axios
import { baseuri } from "../baseuri/baseuri";  // Assuming baseuri is defined correctly

const OfferCard = () => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the offer data from the API using Axios
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`${baseuri}/api/offer/get-offer/6798c3ddf6ffc3b4167d32f9`);
        if (response.data.success) {
          setOffer(response.data.offer);  // Set the offer data if the fetch is successful
        } else {
          throw new Error("Offer data not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, []);

  // Handle accept offer
  const handleAcceptOffer = () => {
    // Logic to accept the offer, for now we just log it
    console.log("Offer Accepted");
  };

  // Handle reject offer
  const handleRejectOffer = () => {
    // Logic to reject the offer, for now we just log it
    console.log("Offer Rejected");
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ marginTop: "20px" }}>
        Error: {error}
      </Typography>
    );
  }

  // Display offer data
  return (
    <Card sx={{ maxWidth: 345, marginTop: "20px", padding: "16px" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {offer.name || "No Name"}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {offer.profession || "No Profession"}
        </Typography>

       

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Estimated Hours: {offer.estimatedHours || "N/A"} hours
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Description: {offer.description || "No Description Available"}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Schedule: {offer.schedule || "No Schedule Available"}
        </Typography>
        <Typography variant="body2" color="green" sx={{ mb: 1 }}>
          Status: {offer.status || "No Status"}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Price: ${offer.price || "N/A"}
        </Typography>
        
      </CardContent>

      {/* Display Accept and Reject buttons if status is "pending" */}
      {offer.status === "pending" && (
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "16px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleAcceptOffer}
            sx={{ width: "48%" }}
          >
            Accept Offer
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleRejectOffer}
            sx={{ width: "48%" }}
          >
            Reject Offer
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default OfferCard;
