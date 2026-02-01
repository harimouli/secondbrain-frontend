import { Button } from "../components/Button";
import { ButtonVariant, ButtonSize } from "../types/button";
import { Menu, Plus, Share2 } from "lucide-react";

import { Card } from "../components/Card";

import { useEffect, useState } from "react";

import { AddContent } from "../components/AddContent";

import { Sidebar } from "../components/Sidebar";

import { useContent } from "../hooks/useContent";

import { IoMenuSharp } from "react-icons/io5";

import { IoIosSearch } from "react-icons/io";

import { NoContentView } from "../components/NoContentView";

import { LoadingView } from "../components/LoadingView";

import { ShareModel } from "../components/ShareModel";

import { type ContentType } from "../utils/Globaltypes";

import { Input } from "@mui/material";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { allContent, refreshContent, isLoading } = useContent();

  const [activeBar, setActiveBar] = useState("Dashboard");
  const [openShareModel, setOpenShareModel] = useState(false);
  const [content, setContent] = useState<ContentType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarOpen, setSidebar] = useState(false);
  const isNoContent: number = content.length;

  useEffect(() => {
    setContent(allContent);
  }, [allContent]);

  const toggleShare = (contentId: string) => {
    const updatedContent = content.map((item: ContentType) => {
      if (item._id === contentId) {
        return { ...item, share: !item.share };
      }
      return item;
    });
    setContent(updatedContent);
  };

  return (
    <main>
      <div>
        {isSidebarOpen && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setSidebar={setSidebar}
            activeBar={activeBar}
            setActiveBar={setActiveBar}
          />
        )}

        <div
          className={`min-h-screen bg-white transition-all duration-300 ${
            isSidebarOpen ? "md:ml-72 lg:ml-72" : "ml-0"
          }`}
        >
          {/*menu  when sidebar is closed*/}

          <ShareModel
            open={openShareModel}
            onClose={() => setOpenShareModel(false)}
          />
          <AddContent
            refreshContent={refreshContent}
            open={modelOpen}
            onClose={setModelOpen}
          />
          {/*Header - Desktop/Tablet*/}
          <nav className="hidden sm:flex border-b border-slate-300 items-center">
            <div className="flex w-full">
              {!isSidebarOpen && (
                <div
                  className="p-3 sm:p-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  onClick={() => {
                    setSidebar(!isSidebarOpen);
                  }}
                >
                  <IoMenuSharp size={25} />
                </div>
              )}
              <div className="flex items-center flex-1 max-w-sm sm:max-w-xl lg:max-w-2xl gap-2 sm:gap-4 p-2 sm:p-3">
                <div className="flex items-center w-full border rounded-md border-slate-300 px-2 sm:px-3">
                  <IoIosSearch className="text-slate-400" size={16} />
                  <Input
                    onChange={(event) => {
                      setSearchValue(event.target.value);
                      console.log(searchValue);
                    }}
                    value={searchValue}
                    type="search"
                    placeholder="find your content..."
                    className="border-none text-sm sm:text-base rounded-md p-2 w-full outline-none border-0"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end ml-auto gap-2 sm:gap-4 p-2 sm:p-4">
                <Button
                  type="button"
                  onClick={() => setModelOpen(true)}
                  startIcon={<Plus size={16} />}
                  size={ButtonSize.Small}
                  variant={ButtonVariant.Primary}
                  text="Add Link"
                ></Button>
                <Button
                  type="button"
                  onClick={() => setOpenShareModel(true)}
                  startIcon={<Share2 size={16} />}
                  size={ButtonSize.Small}
                  variant={ButtonVariant.Secondary}
                  text="Share"
                ></Button>
              </div>
            </div>
          </nav>

          <nav className="sm:hidden w-full flex items-center justify-between p-2 sm:p-3 border-b border-slate-300">
            <div className="flex items-center">
              <Menu
                size={24}
                onClick={() => {
                  setSidebar(!isSidebarOpen);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 ml-3">
              <div className="flex items-center flex-1 border border-slate-300 rounded-md px-2 py-1.5">
                <IoIosSearch size={16} className="text-slate-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="border-none text-sm rounded-md outline-none w-full ml-1"
                />
              </div>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  onClick={() => setModelOpen(true)}
                  startIcon={<Plus size={14} />}
                  size={ButtonSize.MinSmall}
                  variant={ButtonVariant.Primary}
                  text=""
                ></Button>
                <Button
                  type="button"
                  onClick={() => setOpenShareModel(true)}
                  startIcon={<Share2 size={14} />}
                  size={ButtonSize.MinSmall}
                  variant={ButtonVariant.Secondary}
                  text=""
                ></Button>
              </div>
            </div>
          </nav>

          {isLoading ? (
            <LoadingView />
          ) : isNoContent === 0 ? (
            <NoContentView />
          ) : (
            <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:items-start gap-2 sm:gap-3 mt-3 sm:mt-4 p-2 sm:p-3">
              {content.map(({ title, type, link, _id, share }: ContentType) => (
                <Card
                  key={_id}
                  title={title}
                  link={link}
                  contentId={_id}
                  type={type as "document" | "youtube" | "twitter" | "linkedin"}
                  refreshContent={refreshContent}
                  toggleShare={toggleShare}
                  share={share}
                  isPublicView={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
