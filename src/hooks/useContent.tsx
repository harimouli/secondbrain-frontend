import axios from "axios";
import { useState} from "react";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

export const useContent = () => {
    const [allContent, setContent] = useState([]);
    const [isLoading, setLoading] = useState(true);
     
    const refreshContent = async () => {
        try {
            setLoading(true); // Set loading to true when starting request
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            });
            setContent(response.data.content);
        } catch {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false);
        }
    }

   
        
    return {allContent, refreshContent, isLoading};
}