import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Grid,
  Box,
} from "@mui/material";
import { baseuri } from "../../baseuri/baseuri";

const GetProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract userId from token
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      setUserId(decoded.id); // Assuming userId is stored as 'id' in token payload
    } catch (err) {
      setError("Failed to decode token");
      console.error("Error decoding token:", err);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseuri}/api/doctor/getprofile/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data);
      } catch (err) {
        setError("set up your profile");
        console.error("Error fetching doctor profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* Profile Image */}
            <Grid item xs={12} sm={4} display="flex" justifyContent="flex-start" paddingLeft="10px">
              <Avatar
                src={profile?.image}
                sx={{ width: { xs: 100, sm: 120 }, height: { xs: 100, sm: 120 } }}
              />
            </Grid>

            {/* Profile Details */}
            <Grid item xs={12} sm={8} textAlign={{ xs: "center", sm: "left" }}>
              <Typography variant="h5" fontWeight="bold">
                {profile?.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {profile?.email}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {profile?.aboutMe}
              </Typography>
            </Grid>
          </Grid>

          {/* Profile Information */}
          <Grid container spacing={2} sx={{ mt: 3  ,margin:"0px auto"}}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Phone:</strong> {profile?.phone}
              </Typography>
              <Typography variant="body2">
                <strong>Location:</strong> {profile?.location}
              </Typography>
              <Typography variant="body2">
                <strong>Work Status:</strong> {profile?.workStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Experience:</strong> {profile?.experience} years
              </Typography>
              <Typography variant="body2">
                <strong>Field of Study:</strong> {profile?.fieldOfStudy}
              </Typography>
              <Typography variant="body2">
                <strong>Income:</strong> ${profile?.income}
              </Typography>
            </Grid>
          </Grid>

          {/* Doctor's Video Introduction */}
          {profile?.video && (
            <Grid item xs={12} sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Doctor's Introduction Video
              </Typography>
              <Box
                component="video"
                controls
                sx={{
                  width: "100%",
                  maxWidth: "600px",
                  maxHeight: "300px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              >
                <source src={profile.video} type="video/mp4" />
                Your browser does not support the video tag.
              </Box>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default GetProfilePage;
