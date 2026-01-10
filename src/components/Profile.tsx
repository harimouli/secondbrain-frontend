import { useRef } from "react";

import { IoPersonCircleSharp } from "react-icons/io5";
import { Input } from "./Input";
import { LogoutButton } from "./LogoutButton";
import { Button } from "./Button";
import { ButtonVariant, ButtonSize } from "../types/button";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const oldPasswordRef = useRef<HTMLInputElement>(null!);
  const newPasswordRef = useRef<HTMLInputElement>(null!);

  const userName = localStorage.getItem("userName");
  const dateOfJoined = localStorage.getItem("dateOfJoined");
  const isShareEnabled = (() => {
    try {
      return JSON.parse(localStorage.getItem("isShareEnabled") || "false");
    } catch {
      return false;
    }
  })();
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/dashboard");
  };

return (
    <div className="flex flex-col items-center justify-center md:justify-start bg-slate-100 min-h-screen w-full p-4">
      <div className="absolute top-0 left-0 p-4">
        <Button
          text={"Back"}
          variant={ButtonVariant.Primary}
          size={ButtonSize.Small}
          startIcon={<IoArrowBackCircleOutline size={18} className="sm:size-20" />}
          onClick={backToHome}
          type="button"
        />
      </div>
      <div className="mb-4">
        <IoPersonCircleSharp size={48} className="sm:size-64" />
      </div>
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Username: {userName}</h2>
        <h3 className="text-sm sm:text-base">
          Joined at :{" "}
          {dateOfJoined ? new Date(dateOfJoined).toLocaleDateString() : ""}
        </h3>
        <h3 className="text-sm sm:text-base">Sharing Enabled: {isShareEnabled === true ? "Yes" : "No"}</h3>
      </div>
      <div className="flex flex-col p-4 sm:p-5 gap-3 sm:gap-4 w-full max-w-sm">
        <div>
          <h2 className="font-bold text-slate-700 text-sm sm:text-base">Change Password:</h2>
        </div>
        <div>
          <Input
            reference={oldPasswordRef}
            width="w-full"
            type="password"
            placeholder="Old Password"
          />
        </div>
        <div>
          <Input
            reference={newPasswordRef}
            width="w-full"
            type="password"
            placeholder="New Password"
          />
        </div>
      </div>

      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
};
