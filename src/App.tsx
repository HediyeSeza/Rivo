import { useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";

function AppContent() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Header />}

      <AppRoutes />
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;