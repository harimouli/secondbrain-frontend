
import { TwitterIcon } from "../icons/TwitterIcon"
import { SidebarItem } from "./SidebarItem"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { Logo } from "../icons/Logo"
export const Sidebar = () => {
    return (
        <div className = "w-72 h-screen bg-white border-r-2 border-r-[#e9ebed] fixed left-0 top-0 pl-6">
                
                <div className = "flex text-2xl  items-center pt-8">
                <div className = "text-[#4D44E4] pr-4 ">
                    {<Logo/>}
                </div>
                     Brainly 
                </div>
                <div className = "pl-4 pt-4">

                  <SidebarItem text = "Twitter" icon = {<TwitterIcon />}/>
                  <SidebarItem text = "Youtube" icon = {<YoutubeIcon/>}/>
               </div>
      </div>
    ) 
}