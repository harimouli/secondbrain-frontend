import {LuBrain } from "react-icons/lu";
import { TwitterIcon } from "../icons/TwitterIcon"
import { SidebarItem } from "./SidebarItem"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { MdDashboard } from "react-icons/md";
import {SideContainer ,MainLogoBody, LogoInnerChild1, BrandName, DashboardItemsContainer} from "../ui/sidebar/Sidebarui";
import { useNavigate} from "react-router-dom";

import { ProfileSidebar } from "./ProfileSidebar";

import { BiLogOut } from "react-icons/bi";
interface SidebarProps {
    activeBar: string;
    setActiveBar: (active: string) => void;


    isSidebarOpen: boolean;
    setSidebar: (isSidebarOpen: boolean) => void;
}
export const Sidebar = ({isSidebarOpen,setActiveBar, setSidebar}: SidebarProps) => {

    const navigate = useNavigate();

    const navigateToProfile = () => {
        navigate("/profile");
        return;
    }

    return (
       <SideContainer>
        <div>
        <div className = "flex items-center justify-between">
             <MainLogoBody>
                     <LogoInnerChild1>
                         <LuBrain size={45}/>
                     </LogoInnerChild1>
                     <BrandName>Second Brain</BrandName>
                    
             </MainLogoBody>

             <div className = "text-slate-500 font-light cursor-pointer" onClick = {()=> {
                setSidebar(!isSidebarOpen)
             }}>
                     <BiLogOut size = "30"/>   

             </div>
        </div>
       

             <DashboardItemsContainer>
                   <SidebarItem setActivebar={setActiveBar} text = "Dashboard" icon = {<MdDashboard/>}/>
                  <SidebarItem setActivebar = {setActiveBar} text = "Twitter" icon = {<TwitterIcon />}/>
                  <SidebarItem setActivebar = {setActiveBar} text = "Youtube" icon = {<YoutubeIcon/>}/>
             </DashboardItemsContainer> 
        </div> 
        
              <ProfileSidebar onclick = {navigateToProfile}/>
      </SideContainer>
    ) 
}