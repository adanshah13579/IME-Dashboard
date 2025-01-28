import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/Mainlayout";
import ProfilePage from "./pages/profilepage/profilepage";
import OrdersPage from "./pages/orderspage/orderpage";
import DashboardPage from "./pages/dashboardpage/dashboardpage"; // Assuming DashboardPage is the correct component for the dashboard
import CreatofferPage from "./pages/chatpage/chatpage";

const App = () => {
  return (
    <Routes>
      {/* Wrap MainLayout around the routed components */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/creat-offer" element={<CreatofferPage />} />
        <Route path="/logout" element={<div>Logout</div>} /> 
      </Route>
    </Routes>
  );
};

export default App;
