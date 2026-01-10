import { useState } from "react";
import { Button } from "./Button";
import { ButtonVariant, ButtonSize } from "../types/button";

import { Signin } from "./Signin";
import { Signup } from "./Signup";

export const AuthMain = () => {
  const [authMode, setAuthMode] = useState("Signin");

return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full bg-gray-50 p-4">
        <div className="flex flex-col bg-white shadow-lg p-4 sm:p-5 md:p-6 rounded-lg border border-slate-300 w-full max-w-md">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-4 sm:mb-5 gap-x-2">
            <Button
              type="button"
              onClick={() => setAuthMode("Signin")}
              variant={
                authMode === "Signin"
                  ? ButtonVariant.Primary
                  : ButtonVariant.Secondary
              }
              text="Signin"
              size={ButtonSize.Small}
            />
            <Button
              type="button"
              onClick={() => setAuthMode("Signup")}
              variant={
                authMode === "Signup"
                  ? ButtonVariant.Primary
                  : ButtonVariant.Secondary
              }
              text="Signup"
              size={ButtonSize.Small}
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
