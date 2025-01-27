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
import logo from "../assets/ime_logo.png";

const drawerWidth = 230;

const MainLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
    { text: "Orders", icon: <ShoppingCart />, path: "/orders" },
    { text: "Profile", icon: <Person />, path: "/profile" },
    { text: "Chat", icon: <Chat />, path: "/chat" },
    { text: "Logout", icon: <ExitToApp />, path: "/logout" },
  ];

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
            <ListItem button key={index} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Page Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1,p:1  }}
      >
        <Toolbar />
        <Outlet /> {/* This renders the child route components */}
      </Box>
    </Box>
  );
};

export default MainLayout;
