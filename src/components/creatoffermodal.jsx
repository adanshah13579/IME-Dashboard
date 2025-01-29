// CreateOfferModal.jsx
import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const CreateOfferModal = ({ open, handleClose, handleInputChange, formData, handleSubmit }) => {
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
