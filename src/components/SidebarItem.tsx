import  type { ReactElement } from "react";
interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    setNeuron: (activeNeuron: string) => void;

}

export const SidebarItem = (props: SidebarItemProps) => {
    return (
        <div className = "flex pl-4  mt-2 py-2 text-[#5d5e60] cursor-pointer hover:bg-slate-300 rounded max-w-58 transition-all duration-400" onClick={() => {
            
            props.setNeuron(props.text)
        }}>
            <div className = "pr-2">
                {props.icon}
            </div>  
            <div>
                 {props.text}
            </div>
        </div>
    )
}


