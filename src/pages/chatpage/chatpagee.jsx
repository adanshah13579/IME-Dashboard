import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import ChatDrawer from "../../components/chatdrawer";
import Chatbox from "../../components/chatbox";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";

const ChatsystemPage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [recentChats, setRecentChats] = useState([]); // Store recent chats
  const [socket, setSocket] = useState(null); // Socket connection state
  const [messages, setMessages] = useState([]); // Store chat messages
  
  const token = Cookies.get("token");

  useEffect(() => {
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
    });

    newSocket.on("receive_message", (data) => {
      console.log("data",data);
      
      if (data.type === "newChatMessage") {
        const createdAt = data.createdAt ? new Date(data.createdAt) : null;
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderType: data.senderType,
            createdAt: createdAt ? formatDistanceToNow(createdAt, { addSuffix: true }) : "Just now",
            message: data.message,
          },
        ]);
      }
    });

    // Fetch recent messages
    newSocket.emit("get_recent_messages", (recentMessages) => {
      setRecentChats(recentMessages);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const sendMessage = (message) => {
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
        width: "100%",
        height: "auto",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
    >
      {/* Chat Drawer */}
      <Box
        sx={{
          flex: 1,
          minWidth: "350px",
          backgroundColor: "white",
          p: 2,
          display: {
            xs: chatOpen ? "" : "none", 
            sm: "block",
          },
        }}
      >
        <ChatDrawer setChatState={() => setChatOpen(!chatOpen)} recentChats={recentChats} />
      </Box>

      {/* Chatbox */}
      {!chatOpen && (
        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            height: "auto",
            width: "100%",
            backgroundColor: "white",
            p: 2,
          }}
        >
          <Chatbox setChatState={() => setChatOpen(!chatOpen)} messages={messages} sendMessage={sendMessage} />
        </Box>
      )}
    </Box>
  );
};

export default ChatsystemPage;
