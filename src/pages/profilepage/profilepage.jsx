import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Paper,
  Input,
  Stack,
} from '@mui/material';
import { PhotoCamera, Edit } from '@mui/icons-material';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    about: '',
    profession: '',
    fieldOfStudy: '',
    experience: '',
    resumeVideo: null,
    income: '',
    location: '',
    workStatus: 'Active',
    sampleReport: null,
    profilePicture: null,
  });

  const [isEditing, setIsEditing] = useState(true); // Flag to toggle between edit and view mode
  const [isProfileSaved, setIsProfileSaved] = useState(false); // Flag to check if profile is saved

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input changes (Profile picture, resume, sample report)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  // Handle saving profile data (this is just for frontend)
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsProfileSaved(true); // Profile saved
    setIsEditing(false); // Disable editing after saving
  };

  // Handle toggling edit mode
  const handleEditProfile = () => {
    setIsEditing(true); // Enable the form fields for editing
  };

  const renderProfile = () => {
    if (isProfileSaved) {
      return (
        <div>
          <Typography variant="h5">Profile Saved</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEditProfile}
          >
            <Edit sx={{ mr: 1 }} /> Edit Profile
          </Button>
        </div>
      );
    } else {
      return (
        <form onSubmit={handleSaveProfile}>
          <Grid container spacing={3}>
            {/* Profile Picture */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Profile Picture</Typography>
              <Avatar
                sx={{ width: 120, height: 120 }}
                src={
                  profileData.profilePicture
                    ? URL.createObjectURL(profileData.profilePicture)
                    : ''
                }
                alt="Profile Picture"
              />
              {isEditing && (
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <label htmlFor="profilePicture">
                    <Input
                      id="profilePicture"
                      type="file"
                      name="profilePicture"
                      onChange={handleFileChange}
                      inputProps={{ accept: 'image/*' }}
                      sx={{ display: 'none' }}
                    />
                    <IconButton color="primary" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Stack>
              )}
            </Grid>

            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={profileData.phone}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* About */}
            <Grid item xs={12}>
              <TextField
                label="About You"
                name="about"
                value={profileData.about}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* Profession */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Profession"
                name="profession"
                value={profileData.profession}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* Field of Study */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Field of Study"
                name="fieldOfStudy"
                value={profileData.fieldOfStudy}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* Experience */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Years of Experience"
                name="experience"
                type="number"
                value={profileData.experience}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* Resume Video */}
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="resumeVideo">Upload Resume Video</InputLabel>
              {isEditing ? (
                <Input
                  id="resumeVideo"
                  type="file"
                  name="resumeVideo"
                  onChange={handleFileChange}
                  inputProps={{ accept: 'video/*' }}
                  fullWidth
                />
              ) : (
                <Typography variant="body2">
                  {profileData.resumeVideo ? 'Video Uploaded' : 'No video uploaded'}
                </Typography>
              )}
            </Grid>

            {/* Income */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Income"
                name="income"
                type="number"
                value={profileData.income}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {/* Work Status */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Work Status</InputLabel>
                <Select
                  value={profileData.workStatus}
                  onChange={handleChange}
                  name="workStatus"
                  label="Work Status"
                  disabled={!isEditing}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="On Leave">On Leave</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sample Report */}
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="sampleReport">Upload Sample Report</InputLabel>
              {isEditing ? (
                <Input
                  id="sampleReport"
                  type="file"
                  name="sampleReport"
                  onChange={handleFileChange}
                  inputProps={{ accept: 'application/pdf, .doc, .docx' }}
                  fullWidth
                />
              ) : (
                <Typography variant="body2">
                  {profileData.sampleReport ? 'Sample Report Uploaded' : 'No report uploaded'}
                </Typography>
              )}
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                {!isProfileSaved ? (
                  <Button variant="contained" color="primary" type="submit" fullWidth>
                    Save Profile
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProfile}
                    fullWidth
                  >
                    Edit Profile
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </form>
      );
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isProfileSaved ? 'Profile Details' : 'Set Up Your Profile'}
      </Typography>
      <Paper sx={{ padding: 3, boxShadow: 3 }}>
        {renderProfile()}
      </Paper>
    </Box>
  );
};

export default ProfilePage;
