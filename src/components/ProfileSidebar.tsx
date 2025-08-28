
import { IoPersonCircleOutline } from "react-icons/io5";



interface ProfileSidebarProp { 
    onclick: () => void;
}
export const ProfileSidebar = ({onclick}: ProfileSidebarProp) => {
    return (

        <div className = "flex items-center w-[94%] p-4 pl-4  py-2 mt-4 border-slate-300  border-1 rounded" onClick={() => {
            onclick()
        }}>
            <IoPersonCircleOutline size = {20}/>
            <div className="min-w-0 ml-2">
                    <p className="truncate text-xs font-medium">My Profile</p>
                    <p className="truncate text-xs text-muted-foreground">user@secondbrain..</p>
            </div>
            <button className = "ml-auto bg-transparent text-sm border-slate-300 border-1 px-2 rounded">
                Manage
            </button>
        </div>
    )
}