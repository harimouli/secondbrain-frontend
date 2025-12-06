import { useEffect, useState } from "react";
import { Button } from "./Button";
import { ButtonVariant, ButtonSize } from "../types/button";

import { useNavigate } from "react-router-dom";
import { Signin } from "./Signin";
import { Signup } from "./Signup";

export const AuthMain = () => {
  const [authMode, setAuthMode] = useState("Signin");
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="absolute top-4 right-4 p-4 text-gray-600 z-50 bg-white rounded shadow">
        <h1>Demo Credentials</h1>
        <p>Username: Demo</p>
        <p>Password: Demo@12345</p>
      </div>

      <div className="flex justify-center items-center h-screen w-screen bg-gray-50">
        <div className="flex flex-col bg-white shadow-lg p-5 rounded-lg border border-slate-300">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-5 gap-x-2">
            <Button
              onClick={() => setAuthMode("Signin")}
              variant={
                authMode === "Signin"
                  ? ButtonVariant.Primary
                  : ButtonVariant.Secondary
              }
              text="Signin"
              size={ButtonSize.Medium}
            />
            <Button
              onClick={() => setAuthMode("Signup")}
              variant={
                authMode === "Signup"
                  ? ButtonVariant.Primary
                  : ButtonVariant.Secondary
              }
              text="Signup"
              size={ButtonSize.Medium}
            />
          </div>

          {/* Auth Forms */}
          <div className="flex flex-col items-center p-2">
            {authMode === "Signin" ? (
              <Signin />
            ) : (
              <Signup setAuthMode={setAuthMode} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
