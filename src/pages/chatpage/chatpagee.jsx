import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import ChatDrawer from "../../components/chatdrawer";
import Chatbox from "../../components/chatbox";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { formatDistanceToNow } from "date-fns";

const ChatsystemPage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [recentChats, setRecentChats] = useState([]); 
  const [socket, setSocket] = useState(null); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [name, setname ] = useState(""); 


  const token = Cookies.get("token");
  const userId = "67972f77a95d6bbfad654360";
  const userType = "doctor";

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
      newSocket.emit("get_chat_list", { userId, userType });
    });

    newSocket.on("receive_message", (data) => {

      if (data.type === "chatlist") {
        console.log("chatdrawer data", data);
        
        const formattedChats = data.chatlist.map((chat) => ({
          _id: chat._id, // Chat partner's ID
          name: chat.name, // Chat partner's name
          image: chat.image, // Chat partner's image
          lastMessage: chat.lastMessage, // Last message
          lastMessageTime: chat.lastMessageTime, // Timestamp
        }));

        setRecentChats(formattedChats);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token, userId, userType]);

  const handleChatSelection = (chatId) => {
    
    setSelectedUser({ id: chatId,});
    setChatOpen(true); 
  };
  const handlename = ( chatName) => {
    
    setname({  name: chatName });
    setChatOpen(true); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: "350px",
          backgroundColor: "white",
          p: 2,
          display: {
            xs: chatOpen ? "block" : "none",
            sm: "block",
          },
        }}
      >
        <ChatDrawer
          setChatState={handleChatSelection}
          setname ={handlename}
          recentChats={recentChats}
        />
      </Box>

      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          p: 2,
        }}
      >
        {selectedUser && (
          <Chatbox
            setChatState={() => setChatOpen(!chatOpen)}
            selectedUser={selectedUser}
            name={name} 
          />
        )}
      </Box>
    </Box>
  );
};

export default ChatsystemPage;
