import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Notifications from "./pages/Notifications/Notifications";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import { API_ERROR_EVENT, API_ERROR_MESSAGE } from "./services/api";

function AppContent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const handleApiError = () => setApiError(true);

    window.addEventListener(API_ERROR_EVENT, handleApiError);

    return () => {
      window.removeEventListener(API_ERROR_EVENT, handleApiError);
    };
  }, []);

  return (
    <>
      {apiError && (
        <div className="api-error-banner" role="alert">
          <span>{API_ERROR_MESSAGE}</span>
          <button
            type="button"
            onClick={() => setApiError(false)}
            aria-label="Dismiss error message"
          >
            &times;
          </button>
        </div>
      )}
      <AppContent />
    </>
  );
}

export default App;
