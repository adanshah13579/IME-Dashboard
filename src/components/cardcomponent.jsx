// src/components/CardComponent.jsx
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const CardComponent = ({ title, value, icon, bgColor }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: bgColor || "#fff",
        color: "#fff",
        padding: 2,
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ fontSize: "40px", opacity: 0.8 }}>{icon}</Box>
    </Card>
  );
};

export default CardComponent;
