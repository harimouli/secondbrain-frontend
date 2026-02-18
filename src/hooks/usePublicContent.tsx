import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
export const usePublicContent = (hash: string) => {
  const [publicData, setPublicData] = useState<Array<object> | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    refreshPublicData();
  }, [hash]);
  const refreshPublicData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/v1/public-content/${hash}`);
      setPublicData(response.data.sharedContent ?? null);
    } catch (error) {
      console.error("Error fetching public content:", error);
    } finally {
      setLoading(false);
    }
  };

  return [publicData, refreshPublicData, loading] as const;
};
