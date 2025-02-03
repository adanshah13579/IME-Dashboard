import React, { useState } from "react";
import { Box, Typography, Avatar, Card, CardContent, Button } from "@mui/material";

const OfferCard = ({ offerDetails, offerId, selectedUserId, senderType, time, avatar }) => {
  if (!offerDetails) return null;

  const { name, profession, price, schedule, estimatedHours, description } = offerDetails;

  console.log("ofeerid", offerId);
  
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        backgroundColor: "white",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {/* Avatar and Sender Info */}
      <Avatar src={avatar} alt={senderType} sx={{ width: 25, height: 25 }} />
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: 10, sm: 12 },
            fontWeight: "bold",
            color: "black",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {senderType || "Unknown User"} 
          <Typography sx={{ fontSize: { xs: 10, sm: 12 }, color: "black" }}>
            {time || "Unknown Time"}
          </Typography>
        </Typography>

        {/* Offer Card */}
        <Card
          sx={{
            marginTop: "10px",
            padding: "15px",
            boxShadow: 3,
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            maxWidth: "350px",
            width: "100%",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.02)", 
            },
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px", fontWeight: 500 }}>
              Profession: <span style={{ fontWeight: "bold" }}>{profession}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>
              Price: <span style={{ fontWeight: "bold" }}>${price}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>
              Schedule: <span style={{ fontWeight: "bold" }}>{schedule}</span>
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>
              Estimated Hours: <span style={{ fontWeight: "bold" }}>{estimatedHours} hours</span>
            </Typography> */}
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px", color: "#555" }}>
              Description: <span style={{ fontWeight: "normal" }}>{description}</span>
            </Typography>

            {/* Buttons */}
            <Box sx={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  padding: "8px 15px",
                  boxShadow: 2,
                }}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  padding: "8px 15px",
                  boxShadow: 2,
                }}
              >
                Reject
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default OfferCard;
