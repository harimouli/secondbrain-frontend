import { useParams } from "react-router-dom";
import { usePublicContent } from "../hooks/usePublicContent";
import { Card } from "./Card";
import { LuRefreshCcw } from "react-icons/lu";
import { Button } from "@mui/material";

type PublicContentItem = {
  id: string;
  title: string;
  type: string;
  link: string;
};

export const PublicContent = () => {
  const { hash } = useParams<{ hash: string }>();
  const [publicData, refreshPublicData, loading] = usePublicContent(hash || ""); // Custom hook to fetch public content based on hash

  if (!hash) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Invalid or missing content identifier.</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold mb-4">
          Loading Public Content...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex  flex-col p-3 items-center h-screen">
      {publicData && (publicData as PublicContentItem[]).length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(publicData as PublicContentItem[]).map((content) => (
            <Card
              key={content.id}
              contentId={content.id}
              title={content.title}
              type={
                content.type as "document" | "youtube" | "twitter" | "linkedin"
              }
              link={content.link}
              isPublicView={true}
            />
          ))}
        </div>
      ) : (
        <p>No public content available.</p>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outlined"
          onClick={refreshPublicData}
          endIcon={<LuRefreshCcw size={16} />}
          className="px-4 py-2 bg-slate-400 border-1 border-slate-700 text-slate-700 rounded-md hover:bg-slate-500 transition"
        >
          Refresh Content
        </Button>
      </div>
    </div>
  );
};
