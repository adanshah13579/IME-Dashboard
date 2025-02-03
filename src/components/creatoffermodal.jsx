import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
} from "@mui/material";
import { createOffer } from "../RestApi/creatOffer";

const CreateOfferModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    userId: "6796afec77b3bdaa687a0911",
    price: "",
    schedule: null,
    description: "",
    name: "",
    profession: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle date picker change
  const handleDateChange = (newDate) => {
    setFormData({ ...formData, schedule: newDate });
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      console.log("Form Data:", formData);
      const response = await createOffer(formData);
      if (response.success) {
        alert("Offer created successfully!");
        handleClose();
      } else {
        alert("Failed to create offer.");
      }
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("An error occurred while creating the offer.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: "1.2rem", textAlign: "center" }}>
        Create Offer
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
            </Grid>

            {/* Date Picker */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Schedule"
                  value={formData.schedule}
                  onChange={handleDateChange}
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                size="small"
                multiline
                rows={3}
              />
            </Grid>

            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
            </Grid>

            {/* Profession */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      {/* Buttons */}
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" size="small">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" size="small">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOfferModal;
