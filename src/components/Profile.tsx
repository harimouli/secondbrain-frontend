import { useRef } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Input } from "./Input";
import { Button } from "./Button";
import { ButtonVariant, ButtonSize } from "../types/button";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import api from "../api/axiosInstance";
import { InputLabel } from "@mui/material";
export const Profile = () => {
  const oldPasswordRef = useRef<HTMLInputElement>(null!);
  const newPasswordRef = useRef<HTMLInputElement>(null!);

  const userName = localStorage.getItem("username");
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

  const Logout = async () => {
    try {
      await api.post(
        "api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    }
  };
  const changePassword = async () => {
    const oldPassword = oldPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;

    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both fields.");
      return;
    }
    if (oldPassword === newPassword) {
      toast.error("New password must be different from old password.");
      return;
    }

    const passwordSchema = z.object({
      oldPassword: z.string().min(1, "Old password is required"),
      newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters"),
    });

    try {
      passwordSchema.parse({ oldPassword, newPassword });

      await api.post(
        "api/v1/auth/password/change-password",
        { oldPassword, newPassword },
        { withCredentials: true },
      );
      navigate("/auth");
      toast.success("Password updated successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:justify-start bg-slate-100 h-screen w-full p-4">
      <div className="absolute top-0 left-0 p-4">
        <Button
          text={"Back"}
          variant={ButtonVariant.Primary}
          size={ButtonSize.Small}
          startIcon={<IoArrowBackCircleOutline size={18} />}
          onClick={backToHome}
          type="button"
        />
      </div>
      <div className="mb-4">
        <IoPersonCircleSharp size={90} />
      </div>
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">
          Username: {userName}
        </h2>
        <h3 className="text-sm sm:text-base">
          Joined at :{" "}
          {dateOfJoined ? new Date(dateOfJoined).toLocaleDateString() : ""}
        </h3>
        <h3 className="text-sm sm:text-base">
          Sharing Enabled: {isShareEnabled === true ? "Yes" : "No"}
        </h3>
      </div>
      <div className="flex flex-col p-4 sm:p-5 gap-3 sm:gap-4 w-full max-w-sm">
        <div>
          <h2 className="font-bold text-slate-700 text-sm sm:text-base">
            Change Password:
          </h2>
        </div>
        <div>
          <InputLabel
            htmlFor="oldPassword"
            className="text-slate-600 text-sm sm:text-base"
          >
            Old Password
          </InputLabel>
          <Input
            reference={oldPasswordRef}
            width="w-full"
            type="password"
            placeholder="Old Password"
            id="oldPassword"
          />
        </div>
        <div>
          <InputLabel
            htmlFor="newPassword"
            className="text-slate-600 text-sm sm:text-base"
          >
            New Password
          </InputLabel>
          <Input
            reference={newPasswordRef}
            width="w-full"
            type="password"
            placeholder="New Password"
            id="newPassword"
          />
        </div>
        <div>
          <Button
            text={"Update Password"}
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Medium}
            onClick={() => {
              changePassword();
            }}
            type="button"
          />
        </div>
      </div>

      <div className="flex p-2 items-center gap-3">
        <Button
          text={"Logout"}
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Medium}
          onClick={() => {
            Logout();
          }}
          type="button"
        />

        <Button
          text={"Logout all devices"}
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Medium}
          onClick={() => {
            toast.error("you have been logged out from all devices");
          }}
          type="button"
        />
      </div>
    </div>
  );
};
