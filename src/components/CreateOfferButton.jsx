// CreateOfferButton.jsx
import React from "react";
import { Button } from "@mui/material";

const CreateOfferButton = ({ handleClickOpen }) => {
  return (
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
      Create Offer
    </Button>
  );
};

export default CreateOfferButton;
