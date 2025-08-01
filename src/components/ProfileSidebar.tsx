
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoIosArrowDropright } from "react-icons/io";


interface ProfileSidebarProp { 
    onclick: () => void;
}
export const ProfileSidebar = ({onclick}: ProfileSidebarProp) => {
    return (

        <div className = "flex items-center justify-evenly align-middle gap-2 cursor-pointer w-full mb-3 hover:bg-slate-200 rounded-xl mr-5" onClick={() => {
            onclick()
        }}>
            <IoPersonCircleSharp size = {60}/>

                <p>My Profile</p> 
             
                <IoIosArrowDropright size = {30}/>
        </div>
    )
}