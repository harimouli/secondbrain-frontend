import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const usePublicContent = (hash: string) => {
  const [publicData, setPublicData] = useState<Array<object> | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    refreshPublicData();
  }, [hash]);
  const refreshPublicData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/public-content/${hash}`,
      );
      setPublicData(response.data.sharedContent);
    } catch (error) {
      console.error("Error fetching public content:", error);
    } finally {
      setLoading(false);
    }
  };

  return [publicData, refreshPublicData, loading] as const;
};
