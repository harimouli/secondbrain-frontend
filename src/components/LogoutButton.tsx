import axios from "axios";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import { ButtonVariant, ButtonSize } from "../types/button";
import { useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

interface LogoutButtonProps {
  oldPassword: string;
  newPassword: string;
}

export const LogoutButton = ({
  oldPassword,
  newPassword,
}: LogoutButtonProps) => {
  const navigate = useNavigate();
  console.log(oldPassword, newPassword);

  const logout = async (): Promise<void> => {
    const response = await axios.post<void>(
      `${BACKEND_URL}/api/v1/authpassword/change-password`,
      {
        oldPassword,
        newPassword,
      } as ChangePasswordRequest,
      {
        withCredentials: true,
      },
    );
    console.log(response);
    navigate("/auth");
    return;
  };
  return (
    <div>
      <Button
        text="Logout"
        size={ButtonSize.Medium}
        variant={ButtonVariant.Primary}
        endIcon={<LiaSignOutAltSolid size={16} />}
        onClick={logout}
        type="button"
      />
    </div>
  );
};
