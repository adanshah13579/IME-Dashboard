import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/Mainlayout";
import ProfilePage from "./pages/profilepage/profilepage";
import OrdersPage from "./pages/orderspage/orderpage";
import DashboardPage from "./pages/dashboardpage/dashboardpage";
import CreatofferPage from "./pages/creatoffer/creatofferpage";
import ChatsystemPage from "./pages/chatpage/chatpagee";
import SigninPage from "./pages/Auth/signinpage";
import SignUpPage from "./pages/Auth/signuppage";
import GetProfilePage from "./pages/getprofilepage/getprofilepage";
import "./index.css"

const App = () => {
  return (
    <Routes>
      {/* Routes for SignIn and SignUp are outside MainLayout */}
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Wrap MainLayout around the routed components */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/create-profile" element={<ProfilePage />} />
        <Route path="/create-offer" element={<CreatofferPage />} />
        <Route path="/chatpage" element={<ChatsystemPage />} />
        <Route path="/profile" element={<GetProfilePage />} />


      </Route>
    </Routes>
  );
};

export default App;
