import { Button } from "./Button"
import { useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";



export const LogoutButton = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
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