import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import Go Back Icon
import ChatMessage from "./chatmessage.jsx";
import Commentbox from "./commentbox.jsx";
import { messages } from "../data/dummydata.js";

const Chatbox = ({ setChatState }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full viewport height
        backgroundColor: "white", // White background
        color: "black", // Black text color
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid grey",
          height: "auto",
          backgroundColor: "white", // White background
          color: "black", // Black text
        }}
      >
        <Box sx={{ display: { xs: "flex", sm: "none" }, marginRight: "10px" }}>
          <IconButton sx={{ color: "black" }} onClick={() => setChatState()}>
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <Typography
          sx={{
            flex: 1,
            color: "black",
            fontFamily: "Poppins",
            fontSize: {
              xs: "12px",
              sm: "25px",
              md: "20px",
              lg: "25px",
            },
            fontWeight: "bold",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Heading Text
        </Typography>

       
      </Box>

      <Box
        sx={{
          flex: 1, // Takes remaining space
          padding: "20px 10px",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            avatar={msg.avatar}
            name={msg.name}
            time={msg.time}
            message={msg.message}
            isHighlighted={msg.isHighlighted}
          />
        ))}
      </Box>

      {/* Fixed Comment Box at Bottom */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          padding: "10px 5px",
          backgroundColor: "white", // White background
        }}
      >
        <Commentbox />
      </Box>
    </Box>
  );
};

export default Chatbox;
