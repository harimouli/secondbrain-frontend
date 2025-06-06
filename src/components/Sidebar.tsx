
import { TwitterIcon } from "../icons/TwitterIcon"
import { SidebarItem } from "./SidebarItem"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { Logo } from "../icons/Logo"

interface SidebarProps {
    activeNeuron: string;
    setNeuron: (activeNeuron: string) => void;
}
export const Sidebar = ({setNeuron}: SidebarProps) => {
    return (
        <div className = "w-72 h-screen bg-white border-r-2 border-r-[#e9ebed] fixed left-0 top-0 pl-6">
                
                <div className = "flex text-2xl  items-center pt-8">
                <div className = "text-[#4D44E4] pr-2 ">
                    {<Logo/>}
                </div>
                     <h2 className = "font-medium">Second Brain</h2>
                </div>
                <div className = "pl-4 pt-6">

                  <SidebarItem setNeuron = {setNeuron} text = "Twitter" icon = {<TwitterIcon />}/>
                  <SidebarItem setNeuron = {setNeuron} text = "Youtube" icon = {<YoutubeIcon/>}/>
               </div>
      </div>
    ) 
}