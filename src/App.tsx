import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { NotFound } from "./components/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthMain } from "./components/AuthMain";
import Landing from "./components/Landing";
import { ToastContainer } from "react-toastify";
import { PublicContent } from "./components/PublicContent";
import "react-toastify/dist/ReactToastify.css";

import { Profile } from "./components/Profile";
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastStyle={{ maxWidth: "w-[100px] md:w-[300px]" }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthMain />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="mind/:hash" element={<PublicContent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
