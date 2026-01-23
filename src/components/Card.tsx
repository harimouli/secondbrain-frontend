import axios from "axios";
import { BACKEND_URL } from "../config";
import { ExternalLink, Sparkles, Trash } from "lucide-react";
import { FaYoutube, FaXTwitter } from "react-icons/fa6";
import { TweetEmbed } from "./TweetEmbed";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { toast } from "react-toastify";
import { SquarePen } from "lucide-react";
import { Switch, FormControlLabel } from "@mui/material";

export interface CardProps {
  contentId: string;
  title: string;
  type: "document" | "youtube" | "twitter" | "linkedin";
  link: string;
  refreshContent?: () => void;
  share?: boolean;
  isPublicView?: boolean;
}

export const Card = ({
  title,
  type,
  link,
  refreshContent,
  contentId,
  share,
  isPublicView,
}: CardProps) => {
  const deleteCard = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/mind/content/${contentId}`, {
        withCredentials: true,
      });
      refreshContent?.();
      toast.success("deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const makeShareable = async () => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/v1/mind/content/share/${contentId}`,
        { share: !share },
        {
          withCredentials: true,
        },
      );

      refreshContent?.();
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`hover:transition w-full sm:w-64 md:w-72 lg:w-80 xl:w-[290px]`}
    >
      <div
        className={`bg-slate-50 shadow-md rounded-md border border-[#d3d4d5]`}
      >
        <div className="flex justify-between items-center sm:p-2">
          <div className="flex items-center text-sm sm:text-md">
            <div className="pr-1 sm:pr-2">
              {type === "youtube" && <FaYoutube size={20} />}
              {type === "twitter" && <FaXTwitter size={18} />}
            </div>
            <h2 className="font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-[150px]">
              {title}
            </h2>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 text-slate-600">
            <a
              href={link}
              target="_blank"
              title="Open Link"
              rel="noopener noreferrer"
            >
              <ExternalLink
                size={18}
                className="text-gray-400 hover:text-blue-500 cursor-pointer"
              />
            </a>
            {!isPublicView && (
              <div title="edit">
                <SquarePen
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-blue-500"
                />
              </div>
            )}
            {!isPublicView && (
              <div title="delete">
                <Trash
                  size={18}
                  className="cursor-pointer text-gray-400 hover:text-red-500"
                  onClick={deleteCard}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={`aspect-h-9  w-full rounded pt-2 sm:pt-4 ${type === "twitter" ? "h-[200px] sm:h-[300px] overflow-y-scroll" : ""}`}
        >
          {type === "youtube" && <YoutubeEmbed link={link} />}

          {type == "twitter" && <TweetEmbed link={link} />}
        </div>
        <div className="p-1 sm:p-2 flex justify-between items-center border-t border-t-slate-300">
          <button
            className="px-1 sm:px-2 py-1 gap-0.5 flex justify-between items-center text-blue-500 cursor-pointer rounded-md hover:bg-blue-200 text-xs sm:text-sm"
            title="AI Summary"
          >
            <Sparkles size={10} className="mr-0.5 sm:mr-1" />
            <span className="font-medium">AI</span>
          </button>
          {!isPublicView && (
            <FormControlLabel
              control={
                <Switch
                  checked={share}
                  onChange={makeShareable}
                  color="primary"
                  size="small"
                />
              }
              label={
                <span className="text-xs sm:text-sm font-medium">Share</span>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
