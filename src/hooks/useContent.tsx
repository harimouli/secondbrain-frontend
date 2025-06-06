import axios from "axios";

import { useState , useEffect} from "react";
import { BACKEND_URL } from "../config";

export const useContent = () => {
    const [allContent, setContent] = useState([]);
     
        const refreshContent = async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            setContent(response.data.content);
        }


     useEffect(() => {
        refreshContent();
        const  interval = setInterval(()=> {
            refreshContent()
        }, 10* 1000)

        return (
            clearInterval(interval)
        )
     }, []);

     return {allContent, refreshContent};


}