import React, { useState } from "react";
import {
  Box,
  IconButton,
  Divider,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import MicIcon from "@mui/icons-material/Mic";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Commentbox = ({ sendMessage, sendOffer,  }) => {
  const [message, setMessage] = useState("");
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offerDetails, setOfferDetails] = useState({
    name: "adan", // User's name
    profession: "software eng", // Profession
    price: "",
    schedule: "",
    estimatedHours: "",
    description: "",
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({ type: "text", message }); // Send normal text message
      setMessage(""); // Clear the input field after sending the message
    }
  };

  const handleOpenOfferModal = () => setOfferModalOpen(true);
  const handleCloseOfferModal = () => setOfferModalOpen(false);

  const handleSendOffer = () => {
    sendOffer({
      type: "offer",
      ...offerDetails,
    });

    setOfferModalOpen(false);
    setOfferDetails({
      name:  "",
      profession:  "",
      price: "",
      schedule: "",
      estimatedHours: "",
      description: "",
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        padding: "10px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        maxWidth: { lg: "80%" },
        border: "1px solid #ccc",
      }}
    >
      {/* Icons Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side Icons */}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton sx={{ color: "black" }}>
            <AttachFileIcon />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <SentimentSatisfiedAltIcon />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <MicIcon />
          </IconButton>
        </Box>

        {/* Right Side Text and Add Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="body1" sx={{ color: "black" }}>
            Create Offer
          </Typography>
          <IconButton sx={{ color: "black" }} onClick={handleOpenOfferModal}>
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Input Field & Send Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "5px",
          gap: "10px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            sx: {
              height: "35px",
              color: "black",
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
            },
          }}
          inputProps={{
            style: { fontSize: "10px" },
          }}
          sx={{
            borderRadius: "12px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        />

        {/* Send Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "12px",
            height: "35px",
            minWidth: "100px",
            fontSize: "12px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ marginTop: "10px", backgroundColor: "#ccc" }} />

      {/* Offer Modal */}
      <Dialog open={offerModalOpen} onClose={handleCloseOfferModal}>
        <DialogTitle>Create an Offer</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            fullWidth
            value={offerDetails.name}
            onChange={(e) => setOfferDetails({ ...offerDetails, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Profession"
            fullWidth
            value={offerDetails.profession}
            onChange={(e) => setOfferDetails({ ...offerDetails, profession: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={offerDetails.price}
            onChange={(e) => setOfferDetails({ ...offerDetails, price: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Schedule (e.g., Monday 3 PM)"
            fullWidth
            value={offerDetails.schedule}
            onChange={(e) => setOfferDetails({ ...offerDetails, schedule: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Estimated Hours"
            fullWidth
            type="number"
            value={offerDetails.estimatedHours}
            onChange={(e) => setOfferDetails({ ...offerDetails, estimatedHours: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={offerDetails.description}
            onChange={(e) => setOfferDetails({ ...offerDetails, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOfferModal}>Cancel</Button>
          <Button onClick={handleSendOffer} variant="contained" color="primary">
            Send Offer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Commentbox;
