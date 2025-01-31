import React, { useState } from "react";
import { Box, IconButton, Divider, TextField, Button, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import MicIcon from "@mui/icons-material/Mic";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateOfferModal from "./creatoffermodal";

const Commentbox = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Handle opening the modal
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message); // Send message via the prop function
      setMessage(""); // Clear the input field after sending the message
    }
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
          <IconButton sx={{ color: "black" }} onClick={handleClickOpen}>
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
          onChange={(e) => setMessage(e.target.value)} // Update the message state
          InputProps={{
            sx: {
              height: "35px",
              color: "black",
              backgroundColor: "#f5f5f5", // Light gray background for input
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
          onClick={handleSendMessage} // Trigger sending the message
        >
          Send
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ marginTop: "10px", backgroundColor: "#ccc" }} />

      {/* Modal for creating offer */}
      <CreateOfferModal open={openModal} handleClose={handleClose} />
    </Box>
  );
};

export default Commentbox;
