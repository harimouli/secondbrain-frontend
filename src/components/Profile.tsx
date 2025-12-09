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
    <div className="flex flex-col items-center justify-center md:justify-start bg-slate-100 h-screen w-screen">
      <div className="absolute top-0 left-0 p-4">
        <Button
          text={"Back"}
          variant={ButtonVariant.Primary}
          size={ButtonSize.Medium}
          startIcon={<IoArrowBackCircleOutline size={25} />}
          onClick={backToHome}
        />
      </div>
      <div>
        <IoPersonCircleSharp size="md" />
      </div>
      <div className="text-center">
        <h2>Username: {userName}</h2>
        <h3>
          Joined at :{" "}
          {dateOfJoined ? new Date(dateOfJoined).toLocaleDateString() : ""}
        </h3>
        <h3>Sharing Enabled: {isShareEnabled === true ? "Yes" : "No"}</h3>
      </div>
      <div className="flex flex-col p-5 gap-4">
        <div>
          <h2 className="font-bold text-slate-700">Change Password:</h2>
        </div>
        <div>
          <Input
            reference={oldPasswordRef}
            width="w-83"
            type="text"
            placeholder="Old Password"
          />
        </div>
        <div>
          <Input
            reference={newPasswordRef}
            width="w-83"
            type="text"
            placeholder="New Password"
          />
        </div>
      </div>

      <div>
        <LogoutButton />
      </div>
    </div>
  );
};
