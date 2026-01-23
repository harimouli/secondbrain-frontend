import {
  Switch,
  FormControlLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../config";
import { MdOutlineContentCopy } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const CopyField = () => {
  const isShareEnabled = JSON.parse(
    localStorage.getItem("isShareEnabled") || "false",
  );
  const shareableLink = localStorage.getItem("shareableLink") || "";
  const [isPublic, setIsPublic] = useState(isShareEnabled || false);
  const [isLoading, setLoading] = useState(false);
  const [linkValue, setLinkValue] = useState(shareableLink);

  useEffect(() => {
    const fetchInitalState = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${BACKEND_URL}/api/v1/contentshare/status`,
          {
            withCredentials: true,
          },
        );
        setLoading(false);
        localStorage.setItem(
          "isShareEnabled",
          JSON.stringify(response.data.isShareEnabled),
        );
        setIsPublic(response.data.isShareEnabled);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitalState();
  }, []);

  const fetchUrl = async () => {
    try {
      if (isLoading) return;
      setLoading(true);
      const nextValue = !isPublic;
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/contentshare/shareurl`,
        {
          isPublic: nextValue,
        },
        { withCredentials: true },
      );
      setLinkValue(response.data.hash);
      setIsPublic(response.data.isShareEnabled);
      localStorage.setItem("shareableLink", response.data.hash);
      localStorage.setItem(
        "isShareEnabled",
        JSON.stringify(response.data.isShareEnabled),
      );
    } catch (e) {
      console.error("Error fetching shareable link:", e);
      setLinkValue("");
      setIsPublic(isPublic);
      localStorage.setItem("isShareEnabled", JSON.stringify(isPublic));
      toast.error("Failed to update sharing settings.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[90%] flex flex-col items-center gap-4 p-4 transition-all duration-300 ease-in-out">
      <div className="flex align-center w-[65%] p-5 rounded-lg border-1 border-slate-300  hover:border-[#6258DC]  transition-all duration-300 ease-in-out mb-4 box-shadow-sm">
        <FormControlLabel
          control={
            <Switch
              onChange={() => {
                fetchUrl();
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
        className={`transition-all  duration-400 ease-in-out md:w-[90%] ${isPublic ? "" : "hidden pointer-events-none"} flex items-center`}
      >
        <TextField
          fullWidth
          label={isLoading ? "Generating Link..." : "Shareable Link"}
          value={linkValue}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineContentCopy
                  size={35}
                  className="cursor-pointer bg-slate-100 hover:bg-slate-200 rounded-md p-1"
                  onClick={() => {
                    navigator.clipboard.writeText(linkValue);
                    toast.success("Link copied to clipboard!");
                  }}
                />
              </InputAdornment>
            ),
            sx: {
              fontSize: {
                xs: "20px",
                sm: "15px",
              },
            },
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default CopyField;
