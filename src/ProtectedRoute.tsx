
import { type  ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { type AxiosResponse } from "axios";
import { BACKEND_URL } from "./config";
import axios from "axios";
 export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
        const verifyToken = async () => {
          const token = localStorage.getItem("token");

          if(!token) {
            <Navigate to = "/auth" />;
            return;
          }
          const response: AxiosResponse = await axios.get(`${BACKEND_URL}/api/v1/verifylogin`, {
            headers: {
              authorization: token
            }
          });
         
          if (response.status === 403) {
            <Navigate to = "/auth" />;
          }
        };
        verifyToken();
        
        return children;
}  