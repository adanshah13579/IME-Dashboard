import React, { useState, useEffect } from 'react';
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
import { PhotoCamera } from '@mui/icons-material';
import { doctorCreateProfile, doctorEditProfile } from '../../RestApi/creatProfile';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    aboutMe: '',
    location: '',
    workStatus: '',
    experience: '',
    fieldOfStudy: '',
    income: '',
    image: null,
    video: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  const [error, setError] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://srv694651.hstgr.cloud/storage/upload', {
        method: 'POST',
        headers: {
          'x-api-key': 'ayzenn09876@',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading file');
      }

      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = async (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const fileUrl = await uploadFile(files[0]);
      setProfileData((prevData) => ({ ...prevData, [name]: fileUrl }));
    }
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    console.log('Profile Data before submission:', profileData);

    try {
      if (isProfileSaved && doctorId) {
        await doctorEditProfile(doctorId, profileData);
      } else {
        const response = await doctorCreateProfile(profileData);
        setDoctorId(response.data._id);
      }
      setIsProfileSaved(true);
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isProfileSaved ? 'Edit Your Profile' : 'Set Up Your Profile'}
      </Typography>
      <Paper sx={{ padding: 3, boxShadow: 3 }}>
        <form onSubmit={handleSaveProfile}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Profile Picture</Typography>
              <Avatar
                sx={{ width: 120, height: 120 }}
                src={profileData.image || ''}
                alt="Profile Picture"
              />
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <label htmlFor="image">
                  <Input
                    id="image"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    inputProps={{ accept: 'image/*' }}
                    sx={{ display: 'none' }}
                  />
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>

            {[ 'name', 'email', 'phone', 'aboutMe', 'location', 'workStatus', 'experience', 'fieldOfStudy', 'income' ].map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  label={field.replace(/([A-Z])/g, ' $1').trim()}
                  name={field}
                  value={profileData[field]}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Resume Video</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <label htmlFor="video">
                  <Input
                    id="video"
                    type="file"
                    name="video"
                    onChange={handleFileChange}
                    inputProps={{ accept: 'video/*' }}
                    sx={{ display: 'none' }}
                  />
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isProfileSaved ? 'Update Profile' : 'Save Profile'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default ProfilePage;
