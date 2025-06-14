
import { type  ReactNode } from "react";
import { Navigate } from "react-router-dom";

 export const ProtectedRoute = ({ children }: { children: ReactNode }) => {

        const token = localStorage.getItem("token");
        console.log(token);
        if(!token){
                return <Navigate to = "/signin" replace />
        }
        return children
}