import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { createOffer } from "../RestApi/creatOffer";

const CreateOfferModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    userId: "6796afec77b3bdaa687a0911",
    price: 0,
    schedule: "",
    description: "",
    estimatedHours: 0,
    name: "",
    profession: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle the offer form submission
  const handleSubmit = async () => {
    try {
      console.log("formdta", formData);
      const response = await createOffer(formData);
      if (response.success) {
        alert("Offer created successfully!");
        handleClose(); // Close the modal after successful offer creation
      } else {
        alert("Failed to create offer.");
      }
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("An error occurred while creating the offer.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Offer</DialogTitle>
      <DialogContent>
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Schedule"
          name="schedule"
          type="datetime-local"
          value={formData.schedule}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Estimated Hours"
          name="estimatedHours"
          type="number"
          value={formData.estimatedHours}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Profession"
          name="profession"
          value={formData.profession}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOfferModal;
