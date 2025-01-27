import React from "react";
import { Box } from "@mui/material";
import { AttachMoney, CheckCircle, Star } from "@mui/icons-material";
import CardComponent from "../../components/cardcomponent";

const DashboardPage = () => {
  const stats = [
    {
      title: "Total Earnings",
      value: "$15,000",
      icon: <AttachMoney />,
      bgColor: "#4caf50", // Green background
    },
    {
      title: "Orders Completed",
      value: "120",
      icon: <CheckCircle />,
      bgColor: "#1976d2", // Blue background
    },
    {
      title: "Overall Rating",
      value: "4.8/5",
      icon: <Star />,
      bgColor: "#ff9800", // Orange background
    },
    
  ];

  return (
    <Box sx={{ padding: 1  }}>
      {/* Flexbox Container */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allows items to wrap on smaller screens
          justifyContent: "space-between", // Space between items
          gap: 3, // Adjust gap between items
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: "calc(33.333% - 1rem)", // Each item takes 1/3 of the space minus some gap
              boxSizing: "border-box",
              "@media (max-width: 768px)": {
                flexBasis: "calc(50% - 1rem)", // On medium screens (like tablets), take 1/2 width
              },
              "@media (max-width: 480px)": {
                flexBasis: "100%", // On small screens (like mobile), take full width
              },
            }}
          >
            <CardComponent
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              bgColor={stat.bgColor}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardPage;
