import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import Home from "./pages/Home/Home";
import Notifications from "./pages/Notifications/Notifications";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/notifications"
          element={<Notifications />}
        />
      </Routes>
    </>
  );
}

export default App;