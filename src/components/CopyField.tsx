import { Switch, FormControlLabel, TextField } from "@mui/material";
import { useState, useEffect } from "react";

import { BACKEND_URL } from "../config";

import axios from "axios";
import { toast } from "react-toastify";

const CopyField = () => {
  const isShareEnabled = JSON.parse(
    localStorage.getItem("isShareEnabled") || "false",
  );
  const [isPublic, setIsPublic] = useState(isShareEnabled || false);
  const [isLoading, setLoading] = useState(false);
  const [linkValue, setLinkValue] = useState("");

  useEffect(() => {
    if (isPublic) {
      fetchUrl(isPublic);
    }
  }, []);

  const fetchUrl = async (isPublicParam: boolean) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      setLoading(true);

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share-url`,
        {
          isPublic: isPublicParam,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      setLinkValue(response.data.hash);
      setIsPublic(response.data.isShareEnabled);
      localStorage.setItem(
        "isShareEnabled",
        JSON.stringify(response.data.isShareEnabled),
      );
    } catch (e) {
      console.error("Error fetching shareable link:", e);
      setLinkValue("");
      setIsPublic(isPublicParam);
      localStorage.setItem("isShareEnabled", JSON.stringify(isPublicParam));
      toast.error("Failed to update sharing settings.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[90%] flex flex-col items-center gap-4 p-4">
      <div className="flex align-center w-[65%] p-5 rounded-lg border-1 border-slate-300  hover:border-[#6258DC]  transition-all duration-300 ease-in-out mb-4 box-shadow-sm">
        <FormControlLabel
          control={
            <Switch
              onChange={() => {
                setIsPublic(!isPublic);
                fetchUrl(!isPublic);
              }}
              checked={isPublic}
              size="medium"
            />
          }
          label="Enable Sharing"
          labelPlacement="start"
        />
      </div>
      <div
        className={`transition-all  duration-400 ease-in-out w-full ${isPublic ? "" : "opacity-20 pointer-events-none"} `}
      >
        <TextField
          fullWidth
          label={isLoading ? "Generating Link..." : "Shareable Link"}
          value={linkValue}
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default CopyField;
