import axios from "axios";
import { useState} from "react";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const useContent = () => {
    const [allContent, setContent] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const refreshContent = async () => {
        try {
            setLoading(true);
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

            if(!token) {
                toast.error("Unauthorized access");
                navigate("/");
                return;
            }
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    authorization:`Bearer ${token}`
                }
            });
            if (response.status === 401) {
                toast.error("Unauthorized access");
                navigate("/");
                return;
            }
            setContent(response.data.content);
            toast.success("Content refreshed successfully!");
        } catch {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false);
        }
    }

   
        
    return {allContent, refreshContent, isLoading};
}