import  type { ReactElement } from "react";
interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    setActivebar: (activeActivebar: string) => void;

}

export const SidebarItem = (props: SidebarItemProps) => {

    
    return (
        <div className = "flex items-center pl-4  mt-2 py-2 text-[#5d5e60] cursor-pointer hover:bg-slate-300 rounded max-w-58 transition-all duration-400" onClick={() => {
            
            props.setActivebar(props.text)
        }}>
            <div className = "pr-2 text-3xl text-black">
                {props.icon}
            </div>  
            <div>
                 {props.text}
            </div>
        </div>
    )
}


