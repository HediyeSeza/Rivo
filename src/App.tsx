import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import { API_ERROR_EVENT, API_ERROR_MESSAGE } from "./services/api";

function AppContent() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Header />}

      <AppRoutes />
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
