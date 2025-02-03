import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const CardComponent = ({ title, value, icon }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(145deg, #F4FBFF, #FFFFFF)", // Gradient applied here
        color: "black",
        padding: 2,
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        height: "200px",
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
