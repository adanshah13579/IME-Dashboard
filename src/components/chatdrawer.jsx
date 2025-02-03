import { Box, List, ListItem, Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { formatDistanceToNow } from "date-fns"; // Import the function
import { useState } from "react";

const ChatDrawer = ({ setChatState, recentChats, setname }) => {
  const [expandDirect, setExpandDirect] = useState(false);
  const [activeChat, setActiveChat] = useState(null); // Initially set to null

  // Handle user selection and pass user ID to the parent
  const handleChatSelection = (chat) => {
    setActiveChat(chat.name); // Set active chat for UI
    setChatState(chat._id);
    setname(chat.name); // Set active chat for UI
  };

  // Function to truncate long messages
  const truncateMessage = (message, maxLength = 30) => {
    if (message && message.length > maxLength) {
      return message.substring(0, maxLength) + "...";
    }
    return message || ""; // Return empty string if message is null or undefined
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
        <Typography variant="h6" sx={{ fontSize: { xs: "18px", sm: "20px" } }}>
          Chats
        </Typography>
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
                alignItems: "center", // Align avatar, name, and time horizontally
                backgroundColor: activeChat === chat.name ? "#f0f0f0" : "white",
                margin: "10px 0",
                borderRadius: "12px",
                padding: "10px", // Added padding for spacing
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
              onClick={() => handleChatSelection(chat)} // Set chat and pass user ID
            >
              {/* Avatar */}
              <img
                src={chat.image || "/default-avatar.png"} // Fallback to default avatar
                alt={chat.name}
                style={{ width: 47, height: 47, borderRadius: "50%", marginRight: 5 }}
              />

              {/* Chat info */}
              <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {/* Name */}
                  <Typography variant="body2" sx={{ fontSize: { xs: "14px", sm: "16px" }, fontWeight: 500 }}>
                    {chat.name}
                  </Typography>
                  {/* Last message time */}
                  <Typography variant="body2" sx={{ fontSize: "12px", color: "grey" }}>
                    {chat.lastMessageTime ? formatDistanceToNow(new Date(chat.lastMessageTime)) + " ago" : ""}
                  </Typography>
                </Box>
                
                {/* Last message text */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left", // Center the text below the name
                    marginTop: "4px",
                  }}
                >
                  {chat.lastMessage === "offer"
                    ? "Sent you an offer card"
                    : truncateMessage(chat.lastMessage)}
                </Typography>
              </Box>
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
