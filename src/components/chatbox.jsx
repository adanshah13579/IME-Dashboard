import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatMessage from "./chatmessage.jsx";
import Commentbox from "./commentbox.jsx";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import OfferCard from "./offerdetails.jsx"; // Import the OfferCard component

const Chatbox = ({ setChatState, selectedUser, name }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    if (!selectedUser?.id) return;

    const newSocket = io("ws://localhost:3001?token=" + token, {
      transports: ["websocket"],
      forceNew: true,
      reconnectionAttempts: 5,
      timeout: 10000,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");

      newSocket.emit("get_recent_messages", { userId: selectedUser.id });
    });

    newSocket.on("receive_message", (data) => {
      console.log("Received message data:", data);

      if (data.type === "newChatMessage") {
        const createdAt = data.createdAt ? new Date(data.createdAt) : null;

        if (data.receiverId === selectedUser.id || data.senderId === selectedUser.id) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              senderType: data.senderType,
              createdAt: createdAt
                ? formatDistanceToNow(createdAt, { addSuffix: true })
                : "Just now",
              message: data.message,
              offerDetails: data.offerDetails || null, // Add offerDetails if they exist
            },
          ]);
        }
      }

      if (data.type === "recentChats") {
        const filteredMessages = data.recentMessages.recentMessages.filter(
          (msg) => msg.sender === selectedUser.id || msg.receiver === selectedUser.id
        );

        const formattedMessages = filteredMessages.map((msg) => ({
          senderType: msg.senderType,
          createdAt: msg.createdAt
            ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
            : "Just now",
          message: msg.message,
          offerDetails: msg.offerDetails || null, // Add offerDetails if they exist
        }));

        setMessages(formattedMessages);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token, selectedUser]);

  const sendMessage = (message) => {
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    const receiverId = selectedUser?.id;
    socket.emit("send_message", { receiverId, message });
  };

  const sendOffer = (offerDetails) => {
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    const receiverId = selectedUser?.id;
    socket.emit("send_offer", { receiverId, offerDetails });
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
          {name?.name || "User"}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, padding: "20px 10px", overflowY: "auto" }}>
        {messages.length === 0 ? (
          <Typography>No messages yet...</Typography>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              <ChatMessage
                senderType={msg.senderType}
                time={msg.createdAt}
                message={msg.message}
              />
              {/* If the message is an offer, render the OfferCard */}
              {msg.offerDetails && <OfferCard offerDetails={msg.offerDetails} />}
            </div>
          ))
        )}
      </Box>

      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          padding: "10px 5px",
          backgroundColor: "white",
        }}
      >
        <Commentbox sendMessage={sendMessage} sendOffer={sendOffer} />
      </Box>
    </Box>
  );
};

export default Chatbox;
