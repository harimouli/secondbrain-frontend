import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "./config";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`${BACKEND_URL}/api/v1/auth/verify-login`, {
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
