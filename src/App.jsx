import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/Mainlayout";
import ProfilePage from "./pages/profilepage/profilepage";
import OrdersPage from "./pages/orderspage/orderpage";
import DashboardPage from "./pages/dashboardpage/dashboardpage"; 
import CreatofferPage from "./pages/creatoffer/creatofferpage";
import ChatsystemPage from "./pages/chatpage/chatpagee";

const App = () => {
  return (
    <Routes>
      {/* Wrap MainLayout around the routed components */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/creat-offer" element={<CreatofferPage />} />
        <Route path="/chatpage" element={<ChatsystemPage />} />

        <Route path="/logout" element={<div>Logout</div>} /> 
      </Route>
    </Routes>
  );
};

export default App;
