import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  Home,
  Assignment,
  PersonAdd,
  AccountCircle,
  AddCircle,
  Forum,
  Logout,
} from "@mui/icons-material"; // Updated icons
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom"; // For rendering nested routes
import axios from "axios"; // Import axios for API call
import Cookies from "js-cookie"; // Import js-cookie
import logo from "../assets/ime_logo.png";
import { baseuri } from "../baseuri/baseuri";

const drawerWidth = 230;

const MainLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <Home />, path: "/" },
    { text: "Orders", icon: <Assignment />, path: "/orders" },
    { text: "Create Profile", icon: <PersonAdd />, path: "/create-profile" },
    { text: "Profile", icon: <AccountCircle />, path: "/profile" },
    { text: "Create Offer", icon: <AddCircle />, path: "/create-offer" },
    { text: "Chat", icon: <Forum />, path: "/chatpage" },
    { text: "Logout", icon: <Logout />, path: "/signin" },
  ];

  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.post(`${baseuri}/api/auth/logout`);

      // Remove the token from cookies
      Cookies.remove("token"); // Modify if you're using a different cookie name

      // Navigate to the Sign-in page after logout
      navigate("/signin");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#FFFFFF", // White background for sidebar
            borderRight: "1px solid #E0E0E0", // Subtle border for separation
          },
        }}
      >
        {/* Logo Header */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "start",
            padding: "1.5rem 0",
            backgroundColor: "#FFFFFF", // Match sidebar background
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "90%", height: "auto" }} // Keep logo in original colors
          />
        </Toolbar>

        {/* Navigation Links */}
        <List sx={{p:1}}>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                if (item.text === "Logout") {
                  handleLogout(); // Call the logout handler on "Logout" click
                } else {
                  navigate(item.path); // Navigate to other paths
                }
              }}
              sx={{

                borderRadius:"10px" ,
                p:1,
                "&:hover": {
                  backgroundColor: "#000000", // Black background on hover
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: "#FFFFFF", // White text and icons on hover
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#000000" }}>{item.icon}</ListItemIcon> {/* Black icons by default */}
              <ListItemText primary={item.text} sx={{ color: "#000000" }} /> {/* Black text by default */}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#FFFFFF", // White background for content area
          minHeight: "100vh",
        }}
      >
        {/* <Toolbar /> */}
        <Outlet /> {/* This renders the child route components */}
      </Box>
    </Box>
  );
};

export default MainLayout;