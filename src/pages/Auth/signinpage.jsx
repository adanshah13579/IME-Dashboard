import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Link,
  Box,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import { baseuri } from "../../baseuri/baseuri"; // Ensure baseuri is correctly imported

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear error message
    setError("");

    try {
      const response = await axios.post(`${baseuri}/api/auth/doctor-login`, {
        email,
        password,
      });

      // If the response is successful, store the token in cookies
      if (response.status === 200) {
        // Store token in cookies
        Cookies.set("token", response.data.token, { expires: 7, path: "/" });

        const token = Cookies.get("token");
        console.log("token", token);

        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Sign In</Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign In
          </Button>
        </form>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Typography variant="body2">
            Dont have an account?{" "}
            <Link href="/signup" variant="body2">
              Create one
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SigninPage;
