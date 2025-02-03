import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ChatDrawer = ({ setChatState, recentChats,setname }) => {
  const [expandDirect, setExpandDirect] = useState(false);
  const [activeChat, setActiveChat] = useState(null); // Initially set to null

  // Handle user selection and pass user ID to the parent
  const handleChatSelection = (chat) => {
    setActiveChat(chat.name); // Set active chat for UI
    setChatState(chat._id);
    setname(chat.name); // Set active chat for UI
    // Pass the selected user ID to setChatState (this could open the chat box)
  };

  return (
    <Box
      sx={{
        width: {
          xs: "100%", // Full width on small screens
          sm: 320, // Fixed width for larger screens
        },
        height: "100vh",
        borderRadius: "10px",
        backgroundColor: "white",
        color: "black",
        padding: "16px",
        overflowY: "auto",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <Typography variant="h6" sx={{ fontSize: { xs: "18px", sm: "20px" } }}>Chats</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ color: "black", flex: 1, fontSize: { xs: "14px", sm: "16px" } }}>
          Direct Messages
        </Typography>
        <IconButton size="small" onClick={() => setExpandDirect(!expandDirect)} sx={{ color: "black" }}>
          {expandDirect ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Dynamically render recent chats */}
      <List sx={{ marginTop: "8px" }}>
        {recentChats.length > 0 ? (
          recentChats.map((chat, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: activeChat === chat.name ? "#f0f0f0" : "white",
                margin: "10px 0",
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
              onClick={() => handleChatSelection(chat)} // Set chat and pass user ID
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={chat.image || "/default-avatar.png"} // Fallback to default avatar
                  alt={chat.name}
                  style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }}
                />
                <Typography variant="body2" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                  {chat.name}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ flex: 1, textAlign: "right" }}>
                {chat.lastMessage} 
              </Typography>
            </ListItem>
          ))
        ) : (
          <Typography>No recent chats</Typography>
        )}
      </List>
    </Box>
  );
};

export default ChatDrawer;
