import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { type ContentType } from "../utils/Globaltypes";
export const useContent = () => {
  const [allContent, setContent] = useState<ContentType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const refreshContent = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BACKEND_URL}/api/v1/mind/content`, {
        withCredentials: true,
      });

if (response.data.success === false) {
        toast.error("Unauthorized access");
        navigate("/auth");
        return;
      }
      setContent(response.data.content);
      setLoading(false);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { allContent, refreshContent, isLoading };
};
