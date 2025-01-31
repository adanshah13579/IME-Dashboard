import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CreateOfferModal from "../../components/creatoffermodal";
import OfferCard from "../../components/offerCard";

const CreatofferPage = () => {
  const [open, setOpen] = useState(false);  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h4"> Offer Card</Typography>
      

      <Box sx={{margin:"0px auto"}}>
        <OfferCard/>
      </Box>

      <CreateOfferModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default CreatofferPage;
