import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Avatar,
  IconButton,
  Paper,
  Input,
  Stack,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getDoctorProfile } from "../../RestApi/creatProfile";
import { createDoctorProfile } from "../../RestApi/creatProfile";
import { updateDoctorProfile } from "../../RestApi/creatProfile";

const ProfilePage = () => {
  const token = Cookies.get("token");

  // Decode token only if it exists
  const decodedToken = token ? jwtDecode(token) : null;
  console.log("Decoded token:", decodedToken);

  // Access userId from the decoded token (_id)
  const userId = decodedToken ? decodedToken.id : null; // Assuming 'id' field is inside the token

  console.log("Decoded userId:", userId);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    aboutMe: "",
    location: "",
    workStatus: "",
    experience: "",
    fieldOfStudy: "",
    income: "",
    image: null,
    video: null,
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  // Fetch doctor profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;

      try {
        const profile = await getDoctorProfile(userId);
        console.log("Profile fetched:", profile);

        if (profile) {
          setProfileData(profile);
          setProfileExists(true);
        } else {
          setProfileExists(false);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId]); // Only run when userId changes

  // File Upload Function
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://srv694651.hstgr.cloud/storage/upload",
        {
          method: "POST",
          headers: {
            "x-api-key": "ayzenn09876@",
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error uploading file");

      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  // Handle text input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file changes
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

    try {
      if (profileExists) {
        // Update Profile
        await updateDoctorProfile(profileData, userId);
        alert("Profile updated successfully!");
      } else {
        // Create Profile
        await createDoctorProfile(profileData);
        setProfileExists(true); // Mark profile as created
        alert("Profile created successfully!");
      }
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <Box sx={{ padding: 3 ,backgroundColor:"linear-gradient(145deg, #F4FBFF, #FFFFFF)" }}>
      <Typography variant="h4" gutterBottom>
        Set Up or Update Your Profile
      </Typography>
      <Paper sx={{ padding: 3, boxShadow: 3 ,backgroundColor:"linear-gradient(145deg, #F4FBFF, #FFFFFF)"}}>
        <form onSubmit={handleSaveProfile}>
          <Grid container spacing={3}>
            {/* Profile Picture */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Profile Picture</Typography>
              <Avatar
                sx={{ width: 120, height: 120 }}
                src={profileData.image || ""}
              />
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <label htmlFor="image">
                  <Input
                    id="image"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    inputProps={{ accept: "image/*" }}
                    sx={{ display: "none" }}
                  />
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>

            {/* Input Fields */}
            {[
              "name",
              "email",
              "phone",
              "aboutMe",
              "location",
              "workStatus",
              "experience",
              "fieldOfStudy",
              "income",
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  label={field.replace(/([A-Z])/g, " $1").trim()}
                  name={field}
                  value={profileData[field]}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            ))}

            {/* Video Upload */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Resume Video</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <label htmlFor="video">
                  <Input
                    id="video"
                    type="file"
                    name="video"
                    onChange={handleFileChange}
                    inputProps={{ accept: "video/*" }}
                    sx={{ display: "none" }}
                  />
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>

            {/* Sample Report */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Upload Your Sample Report</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <label htmlFor="file">
                  <Input
                    id="file"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    inputProps={{ accept: "*/*" }}
                    sx={{ display: "none" }}
                  />
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : profileExists
                  ? "Update Profile"
                  : "Save Profile"}
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
