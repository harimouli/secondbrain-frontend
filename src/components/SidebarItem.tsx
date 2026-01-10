import { type ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  setActivebar: (activeActivebar: string) => void;
  isActive: boolean;
}

export const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div
      className={`flex w-full items-center pl-4  mt-2 py-2  cursor-pointer hover:bg-slate-200 rounded max-w-58 transition-all duration-400 font-normal ${props.isActive ? "bg-[#6258DC]/10" : ""}`}
      onClick={() => {
        props.setActivebar(props.text);
      }}
    >
      <div
        className={`pr-2 text-3xl ${props.isActive ? "text-[#6258DC]" : "text-black"}`}
      >
        {props.icon}
      </div>
      <div
        className={`${props.isActive ? "text-[#6258DC]" : "text-black"} font-medium`}
      >
        {props.text}
      </div>
    </div>
  );
};
