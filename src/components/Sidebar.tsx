import {LuBrain } from "react-icons/lu";
import { TwitterIcon } from "../icons/TwitterIcon"
import { SidebarItem } from "./SidebarItem"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { MdDashboard } from "react-icons/md";
import {SideContainer ,MainLogoBody, LogoInnerChild1, BrandName, DashboardItemsContainer} from "../ui/sidebar/Sidebarui";
import { LuPanelLeftClose } from "react-icons/lu";
interface SidebarProps {
    activeBar: string;
    setActiveBar: (active: string) => void;
    isSidebarOpen: boolean;
    setSidebar: (isSidebarOpen: boolean) => void;
}
export const Sidebar = ({isSidebarOpen,setActiveBar, setSidebar}: SidebarProps) => {
    return (
       <SideContainer>

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
                     <LuPanelLeftClose size = "25"/>    

             </div>
        </div>
       

             <DashboardItemsContainer>
                   <SidebarItem setActivebar={setActiveBar} text = "Dashboard" icon = {<MdDashboard/>}/>
                  <SidebarItem setActivebar = {setActiveBar} text = "Twitter" icon = {<TwitterIcon />}/>
                  <SidebarItem setActivebar = {setActiveBar} text = "Youtube" icon = {<YoutubeIcon/>}/>
             </DashboardItemsContainer> 
      </SideContainer>
    ) 
}