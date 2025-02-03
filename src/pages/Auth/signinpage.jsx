import React, { useState } from "react";
import { TextField, Button, Typography, Container, Link, Box } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { baseuri } from "../../baseuri/baseuri";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${baseuri}/api/auth/doctor-login`, {
        email,
        password,
      });

      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 7, path: "/" });
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
        <Typography variant="h5" sx={{ marginBottom: 4, fontWeight: 600 }}>
          Sign In
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              padding: "12px 0",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#3f51b5", // Darken on hover
              },
            }}
          >
            Sign In
          </Button>
        </form>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/signup" variant="body2" sx={{ fontWeight: "bold" }}>
              Create one
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SigninPage;
