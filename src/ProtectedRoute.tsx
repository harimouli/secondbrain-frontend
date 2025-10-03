

import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import axios, { type AxiosResponse } from "axios";
import { BACKEND_URL } from "./config";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(true); 

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          setIsAuth(false);
          return;
        }

        const response: AxiosResponse = await axios.get(
          `${BACKEND_URL}/api/v1/verifylogin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch {
        setIsAuth(false);
      }
    };

    verifyToken();
  }, []);

  

  
  
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
