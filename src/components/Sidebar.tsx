import {LuBrain } from "react-icons/lu";
import { TwitterIcon } from "../icons/TwitterIcon"
import { SidebarItem } from "./SidebarItem"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { MdDashboard } from "react-icons/md";
import {SideContainer ,MainLogoBody, LogoInnerChild1, BrandName, DashboardItemsContainer} from "../ui/sidebar/Sidebarui";

interface SidebarProps {
    activeNeuron: string;
    setNeuron: (activeNeuron: string) => void;
}
export const Sidebar = ({setNeuron}: SidebarProps) => {
    return (
       <SideContainer>
             <MainLogoBody>
                     <LogoInnerChild1>
                         <LuBrain size={45}/>
                     </LogoInnerChild1>
                     <BrandName>Second Brain</BrandName>
             </MainLogoBody>
             <DashboardItemsContainer>
                   <SidebarItem setNeuron={setNeuron} text = "Dashboard" icon = {<MdDashboard/>}/>
                  <SidebarItem setNeuron = {setNeuron} text = "Twitter" icon = {<TwitterIcon />}/>
                  <SidebarItem setNeuron = {setNeuron} text = "Youtube" icon = {<YoutubeIcon/>}/>
             </DashboardItemsContainer> 
      </SideContainer>
    ) 
}