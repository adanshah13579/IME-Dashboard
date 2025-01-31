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
import { Dashboard, ShoppingCart, Person, Chat, ExitToApp } from "@mui/icons-material";
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
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    { text: "Orders", icon: <ShoppingCart />, path: "/orders" },
    { text: "Creat-Profile", icon: <Person />, path: "/create-profile" },
    { text: "Profile", icon: <Person />, path: "/profile" },
    { text: "Creatoffer", icon: <Chat />, path: "/creat-offer" },
    { text: "Chatpage", icon: <Chat />, path: "/chatpage" },
    { text: "Logout", icon: <ExitToApp />, path: "/signin" },
  ];

  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.post(`${baseuri}/api/auth/logout`);

      // Remove the token from cookies
      Cookies.remove('token');  // Modify if you're using a different cookie name

      // Navigate to the Sign-in page after logout
      navigate('/signin');
    } catch (error) {
      console.error("Logout failed:", error.response ? error.response.data : error.message);
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
          },
        }}
      >
        {/* Logo Header */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "1rem 0",
            color: "white",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "75%", height: "auto" }}
          />
        </Toolbar>

        {/* Navigation Links */}
        <List>
          {menuItems.map((item, index) => (
            <ListItem 
              button 
              key={index} 
              onClick={() => {
                if (item.text === "Logout") {
                  handleLogout();  // Call the logout handler on "Logout" click
                } else {
                  navigate(item.path);  // Navigate to other paths
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Page Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1 }}
      >
        <Toolbar />
        <Outlet /> {/* This renders the child route components */}
      </Box>
    </Box>
  );
};

export default MainLayout;
