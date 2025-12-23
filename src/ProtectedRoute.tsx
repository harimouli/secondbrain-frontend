import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "./config";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`${BACKEND_URL}/api/v1/auth/verifylogin`, {
          withCredentials: true,
        });
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuth === null) {
    return <div></div>; // or a loading spinner
  }
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
