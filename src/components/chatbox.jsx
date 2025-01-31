import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatMessage from "./chatmessage.jsx"; // Ensure the file path is correct
import Commentbox from "./commentbox.jsx"; // Ensure the file path is correct
import { io } from "socket.io-client";
import Cookies from "js-cookie"; // Import js-cookie
import { formatDistanceToNow } from "date-fns";

const Chatbox = ({ setChatState }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const token = Cookies.get("token");

  


  useEffect(() => {
    console.log("test" + token);
    
    const newSocket = io("ws://localhost:3001?token="+token, {
      transports: ["websocket"],
      forceNew: true,  // Ensures a fresh connection
      reconnectionAttempts: 5, // Try reconnecting 5 times
      timeout: 10000, // 5 seconds timeout
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(newSocket);
    

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    
    newSocket.on("receive_message", (data) => {
      console.log("Received data:", data);
    
      if (data.type === "newChatMessage") {
        console.log("Processed message:", data);
    
        // Check if createdAt is valid
        const createdAt = data.createdAt ? new Date(data.createdAt) : null;
    
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderType: data.senderType,
            createdAt: createdAt
              ? formatDistanceToNow(createdAt, { addSuffix: true })
              : "Just now",
            message: data.message,
          },
        ]);
      }
    });
    
    newSocket.emit("get_recent_messages");

    return () => {
      newSocket.disconnect();
    };
  }, [token]); 

  const sendMessage = (message) => {
    console.log("message", message);

    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    const receiverId = "6796afec77b3bdaa687a0911";
    socket.emit("send_message", { receiverId, message });
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid grey",
        }}
      >
        <Box sx={{ display: { xs: "flex", sm: "none" }, marginRight: "10px" }}>
          <IconButton sx={{ color: "black" }} onClick={() => setChatState()}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography sx={{ flex: 1, fontSize: "20px", fontWeight: "bold" }}>
          Chat Heading
        </Typography>
      </Box>

      <Box sx={{ flex: 1, padding: "20px 10px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            avatar={msg.avatar}

            senderType={msg.senderType}
            time={msg.createdAt}
            message={msg.message}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          padding: "10px 5px",
          backgroundColor: "white",
        }}
      >
        <Commentbox sendMessage={sendMessage} />
      </Box>
    </Box>
  );
};

export default Chatbox;
