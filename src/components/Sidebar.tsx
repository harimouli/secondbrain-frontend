
import {Brain} from "lucide-react"
import { TwitterIcon } from "../icons/TwitterIcon"
import { SidebarItem } from "./SidebarItem"
import { CgYoutube } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { MainLogoBody , BrandName} from "../ui/sidebar/sidebar";
import { useNavigate} from "react-router-dom";

import { ProfileSidebar } from "./ProfileSidebar";

import { type ChildrenType } from "../utils/Globaltypes";
import type { ReactNode } from "react";

interface SidebarProps {
    activeBar: string;
    setActiveBar: (active: string) => void;


    isSidebarOpen: boolean;
    setSidebar: (isSidebarOpen: boolean) => void;
}
export const Sidebar = ({isSidebarOpen,setActiveBar, setSidebar, activeBar}: SidebarProps) => {

    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate("/profile");
        return;
    }


    const SideContainer = ({children}: ChildrenType) => {
            return (
                <div className = "fixed left-0 top-0 z-50  h-screen transition-all ease-in-out duration-300  md:w-72 flex flex-col justify-between  bg-slate-100 border-r-1 border-r-[#cfd5dd] md:fixed md:left-0 md:top-0 pl-6">
                        {children}
                </div>
            )
    }
    
    
    
   const DashboardItemsContainer = ({children}: {children: ReactNode}) => {
           return (
                   <div className = "pt-3 w-[95%]">
                           {children}
                   </div>
           )
   }

    return (
       <SideContainer>
        <div>
        <div className = "flex  items-center justify-between w-[95%] pt-4">
             <MainLogoBody>
                         <div className="flex  items-center justify-center rounded-md bg-blue-600 text-white">
                                <Brain className="size-9" aria-hidden="true" />
                        </div> 
                <BrandName>Mind Space</BrandName>
                    
             </MainLogoBody>

             <button className = "flex items-center text-slate-500 font-light cursor-pointer ml-auto transition-all duration-300 rounded-md  hover:bg-slate-300" onClick = {()=> {
                setSidebar(!isSidebarOpen)
             }}>
                    <MdOutlineKeyboardArrowRight  size = "30"/>   

             </button>
        </div>
       

             <DashboardItemsContainer>
                   <SidebarItem isActive = {activeBar === "Dashboard"} setActivebar={setActiveBar} text = "Dashboard" icon = {<MdDashboard/>}/>
                  <SidebarItem isActive = {activeBar === "Twitter"} setActivebar={setActiveBar} text = "Twitter" icon = {<TwitterIcon />}/>
                  <SidebarItem isActive = {activeBar === "Youtube"} setActivebar={setActiveBar} text = "Youtube" icon = {<CgYoutube />}/>
                   <ProfileSidebar onclick = {navigateToProfile}/>
             </DashboardItemsContainer> 
            
       
         </div>
           
      </SideContainer>
    ) 
}