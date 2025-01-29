import { Box } from "@mui/material";
import { useState } from "react";
import ChatDrawer from "../../components/chatdrawer";
import Chatbox from "../../components/chatbox";

const ChatsystemPage = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          flexDirection: {
            xs: "column", // Stack ChatDrawer and Chatbox vertically on xs
            sm: "row",    // Side-by-side layout on sm+
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: "350px",
            backgroundColor: "white",
            p: 2,
            display: {
              xs: chatOpen ? "" : "none", // Show only ChatDrawer when chatOpen is true
              sm: "block",                // Always show ChatDrawer on sm+ screens
            },
          }}
        >
          <ChatDrawer setChatState={() => setChatOpen(!chatOpen)} />
        </Box>

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
            <Chatbox setChatState={() => setChatOpen(!chatOpen)} />
             
          </Box>
        )}
      </Box>
  );
};

export default ChatsystemPage;
