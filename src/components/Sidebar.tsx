import { Brain, ChevronLeft } from "lucide-react";
import { FaTwitter } from "react-icons/fa";
import { SidebarItem } from "./SidebarItem";
import { SiYoutube } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { MainLogoBody, BrandName } from "../ui/sidebar/sidebar";
import { useNavigate } from "react-router-dom";

import { ProfileSidebar } from "./ProfileSidebar";

import { type ChildrenType } from "../utils/Globaltypes";
import type { ReactNode } from "react";

interface SidebarProps {
  activeBar: string;
  setActiveBar: (active: string) => void;

  isSidebarOpen: boolean;
  setSidebar: (isSidebarOpen: boolean) => void;
}
export const Sidebar = ({
  isSidebarOpen,
  setActiveBar,
  setSidebar,
  activeBar,
}: SidebarProps) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
    return;
  };

  const SideContainer = ({ children }: ChildrenType) => {
    return (
      <div className="fixed left-0 top-0 z-50 sm:z-50 lg:z-0 h-screen transition-all transform ease-in-out duration-300 flex flex-col justify-between bg-slate-100 border-r border-r-[#cfd5dd] p-2 sm:p-3 pt-0 w-64 sm:w-72">
        {children}
      </div>
    );
  };

  const DashboardItemsContainer = ({ children }: { children: ReactNode }) => {
    return <div className="pt-3 sm:pt-4 w-[95%] sm:w-full">{children}</div>;
  };

  return (
    <SideContainer>
      <div>
        <div className="flex items-center justify-between w-[95%] sm:w-full pt-3 sm:pt-4">
          <MainLogoBody>
            <div className="flex items-center justify-center rounded-md bg-[#6258DC] text-white">
              <Brain className="size-7 sm:size-9" aria-hidden="true" />
            </div>
            <BrandName className="text-sm sm:text-base">MindSpace</BrandName>
          </MainLogoBody>
          <button
            className="flex items-center text-slate-500 font-light cursor-pointer ml-auto transition-all duration-300 rounded-md hover:bg-[#6258DC]/10 p-1 sm:p-2"
            onClick={() => {
              setSidebar(!isSidebarOpen);
            }}
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <MdOutlineKeyboardArrowRight size={20} />
            )}
          </button>
        </div>
        {/*Dashboard Items*/}
        <DashboardItemsContainer>
          <SidebarItem
            isActive={activeBar === "Dashboard"}
            setActivebar={setActiveBar}
            text="Dashboard"
            icon={<MdDashboard />}
          />
          <SidebarItem
            isActive={activeBar === "X"}
            setActivebar={setActiveBar}
            text="X"
            icon={<FaTwitter />}
          />
          <SidebarItem
            isActive={activeBar === "Youtube"}
            setActivebar={setActiveBar}
            text="Youtube"
            icon={<SiYoutube />}
          />
          <ProfileSidebar onclick={navigateToProfile} />
        </DashboardItemsContainer>
      </div>
    </SideContainer>
  );
};
