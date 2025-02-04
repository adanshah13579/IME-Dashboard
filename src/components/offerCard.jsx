import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import { baseuri } from "../baseuri/baseuri";
import Cookies from "js-cookie";

const OfferCard = ({ offerId, senderType, time, avatar, selectedUserId, }) => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // accept or reject

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`${baseuri}/api/offer/get-offer/${offerId}`);
        if (response.data.success) {
          setOffer(response.data.offer);
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
  }, [offerId]);

  // Handle modal open for accept/reject
  const handleOpenModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handle confirm action (accept/reject)
  const handleConfirmAction = async () => {
    const token = Cookies.get("authToken"); // Get token for authorization

    try {
      setLoading(true);

      const apiEndpoint =
        actionType === "accept" ? "/api/offer/accept-offer" : "/api/offer/reject-offer";
      const response = await axios.put(
        `${baseuri}${apiEndpoint}`,
        { offerId, userId: selectedUserId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setOffer((prevOffer) => ({
          ...prevOffer,
          status: actionType === "accept" ? "Accepted" : "Rejected", // Update status based on action
        }));
        console.log(`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} offer`);
      } else {
        throw new Error("Failed to perform action");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setModalOpen(false);
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Error state
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // Render the card
  const isDoctor = senderType === "doctor"; // Check if sender is a doctor

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        backgroundColor: "white",
        flexDirection: isDoctor ? "row-reverse" : "row", // Align to the right if the sender is a doctor
        justifyContent: isDoctor ? "flex-end" : "flex-start",
      }}
    >
      <Avatar src={avatar} alt={senderType} sx={{ width: 25, height: 25 }} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: isDoctor ? "flex-end" : "flex-start" }}>
        <Typography sx={{ fontSize: { xs: 10, sm: 12 }, fontWeight: "bold", color: "black", display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: { xs: 10, sm: 12 }, color: "black" }}>{time || "Unknown Time"}</Typography>
          {senderType || "Unknown User"}
        </Typography>

        <Card sx={{ marginTop: "10px", padding: "15px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f9f9f9", maxWidth: "350px", width: "100%", alignSelf: isDoctor ? "flex-end" : "flex-start" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
              {offer?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px", fontWeight: 500 }}>
              Profession: <strong>{offer?.profession}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>
              Price: <strong>${offer?.price}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>
              Schedule: <strong>{offer?.schedule}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px", color: "#555" }}>
              Description: {offer?.description}
            </Typography>

            {offer?.status && (
              <>
                <Typography sx={{ marginTop: "10px", fontWeight: "bold", color: offer.status === "Accepted" ? "green" : offer.status === "Rejected" ? "red" : "black" }}>
                  {offer.status}
                </Typography>

                {offer.status === "Active" && !isDoctor && (
                  <Box sx={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="primary" sx={{ textTransform: "none", borderRadius: "20px", padding: "8px 15px", boxShadow: 2 }} onClick={() => handleOpenModal("accept")}>
                      Accept
                    </Button>
                    <Button variant="outlined" color="error" sx={{ textTransform: "none", borderRadius: "20px", padding: "8px 15px", boxShadow: 2 }} onClick={() => handleOpenModal("reject")}>
                      Reject
                    </Button>
                  </Box>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Confirmation Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to {actionType} this offer?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmAction} color={actionType === "accept" ? "primary" : "error"}>{actionType === "accept" ? "Accept" : "Reject"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OfferCard;
