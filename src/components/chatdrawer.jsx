import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { chatList, moreChats } from "../data/dummydata.js";

const dummyAvatar = "https://example.com/dummy-avatar.jpg";

const ChatDrawer = ({ setChatState }) => {
  const [expandDirect, setExpandDirect] = useState(false);
  const [activeChat, setActiveChat] = useState("Adan Shah");

  return (
    <Box
      sx={{
        width: {
          xs: "100%", // Full width on small screens
          sm: 320, // Fixed width for larger screens
        },
        height: "92vh",
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

      <List sx={{ marginTop: "8px" }}>
        {chatList.map((chat, index) => (
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
            onClick={() => {
              setActiveChat(chat.name);
              setChatState();
            }}
          >
            <Avatar src={dummyAvatar} sx={{ width: 35, height: 35, marginRight: 1 }} />
            <ListItemText primary={chat.name} secondary={chat.time} />
            <ListItemAvatar>
              <Stack direction="row" spacing={-1}>
                <Avatar src={chat.avatar} sx={{ width: 35, height: 35, border: "2px solid black" }} />
                <Avatar src={chat.groupAvatar} sx={{ width: 25, height: 25, border: "2px solid black" }} />
              </Stack>
            </ListItemAvatar>
          </ListItem>
        ))}

        {expandDirect &&
          moreChats.map((chat, index) => (
            <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={dummyAvatar} sx={{ width: 35, height: 35, marginRight: 1 }} />
              <ListItemText primary={chat.name} secondary={chat.time} />
              <ListItemAvatar>
                <Stack direction="row" spacing={-1}>
                  <Avatar src={chat.avatar} sx={{ width: 35, height: 35, border: "2px solid black" }} />
                  <Avatar src={chat.groupAvatar} sx={{ width: 25, height: 25, border: "2px solid black" }} />
                </Stack>
              </ListItemAvatar>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default ChatDrawer;
