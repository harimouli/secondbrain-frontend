import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { type ContentType } from "../utils/Globaltypes";
import api from "../api/axiosInstance";

export const useContent = () => {
  const [allContent, setContent] = useState<ContentType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    refreshContent();
  }, []);
  const refreshContent = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/v1/mind/content");
      if (
        response.data.success === false &&
        response.data.message === "Unauthorized"
      ) {
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
