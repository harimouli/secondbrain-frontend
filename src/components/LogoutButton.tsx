import { Button } from "./Button";
import {ButtonVariant, ButtonSize} from "../types/button"
import { useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";



export const LogoutButton = () => {
    const navigate = useNavigate();
    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/auth")
        return;
        
    }
    return (
        <div>
            <Button 
            text="Logout" 
            size={ButtonSize.Medium}  
            variant={ButtonVariant.Primary} 
            endIcon={<LiaSignOutAltSolid/>}
            onClick={logout}
            />
        </div>
    )
}