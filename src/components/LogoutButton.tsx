import { Button } from "./Button"
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
            size="md"  
            variant="primary" 
            endIcon={<LiaSignOutAltSolid/>}
            onClick={logout}
            />
        </div>
    )
}