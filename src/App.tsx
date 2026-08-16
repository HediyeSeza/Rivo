import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Notifications from "./pages/Notifications/Notifications";
import NotFound from "./pages/NotFound/NotFound";

function AppContent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
<Routes>
  <Route path="/" element={<Home />} />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/profile" element={<Profile />} />

  <Route path="*" element={<NotFound />} />
</Routes>
      </Routes>
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;
export default App;
