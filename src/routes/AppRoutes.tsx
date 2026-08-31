import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Notifications from "../pages/Notifications/Notifications";
import Profile from "../pages/Profile/Profile";
import Search from "../pages/Search/Search";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Current user's profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Other user's profile */}
      <Route path="/profile/:userId" element={<Profile />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/notifications"
        element={<Notifications />}
      />

      <Route path="/search" element={<Search />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;