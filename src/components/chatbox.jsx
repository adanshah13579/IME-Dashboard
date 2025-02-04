import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatMessage from "./chatmessage.jsx";
import Commentbox from "./commentbox.jsx";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";
import OfferCard from "./offerCard.jsx";

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

      console.log("dataaa",data);

  
      if (data.type === "recentChats") {
        const filteredMessages = data.recentMessages.recentMessages.filter(
          (msg) => msg.sender === selectedUser.id || msg.receiver === selectedUser.id
        );
  
        const formattedMessages = filteredMessages.map((msg) => {
          let parsedOffer = null;
  
          if (msg.typeOfMessage === "offer" && msg.message) {
            try {
              parsedOffer = JSON.parse(msg.message);
            } catch (err) {
              console.error("Error parsing offer message:", err);
            }
          }
  
          return {
            senderType: msg.senderType,
            createdAt: msg.createdAt
              ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })
              : "Just now",
            message: parsedOffer ? parsedOffer : msg.message,
            offerDetails: parsedOffer || null,
            offerId: msg.offerId || null, // Ensure offerId is passed

          };
        });
  
        setMessages(formattedMessages);
      }
    });
  
    newSocket.on("offer_sent", (data) => {
      console.log("Offer sent confirmation received:", data);
  
      const newOfferMessage = {
        senderType: "doctor", 
        createdAt: formatDistanceToNow(new Date(), { addSuffix: true }),
        message: data.offerDetails, 
        offerDetails: data.offerDetails,
        offerId: data.offerId, // Ensure offerId is included
      };
  
      setMessages((prevMessages) => [...prevMessages, newOfferMessage]);
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
    const messageContent = message.message || message;
    socket.emit("send_message", { receiverId, message: messageContent });
  };

  const sendOffer = (offerData) => {
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    if (!selectedUser?.id) {
      console.error("No user selected to send the offer to");
      return;
    }

    const offerDetails = {
      receiverId: selectedUser?.id,
      offerData,
    };

    console.log("Sending offer:", offerDetails);
    socket.emit("send_offer", offerDetails);
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
        {msg.offerDetails ? (
          <OfferCard offerDetails={msg.offerDetails}   offerId={msg.offerId}  // Ensure offerId is passed
          senderType={msg.senderType}
          time={msg.createdAt}        selectedUserId={selectedUser.id} 
/>
        ) : (
          <ChatMessage
            senderType={msg.senderType}
            time={msg.createdAt}
            message={msg.message}
          />
        )}
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
