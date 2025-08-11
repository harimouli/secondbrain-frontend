import { type ReactNode } from "react"
import { type ChildrenType } from "../../utils/Globaltypes"



export const SideContainer = ({children}: ChildrenType) => {
        return (
            <div className = "w-72 h-screen flex flex-col justify-between   bg-slate-100 border-r-2 border-r-[#c0d8f5] fixed left-0 top-0 pl-6 transition-all ease-in-out  duration-100">
                    {children}
            </div>
        )
}
export const MainLogoBody = (props: ChildrenType) => {
    return (
        <div className = "flex text-2xl  items-center pt-4 transition-all duration-1000">
            {props.children}
        </div>
    )
}


export const LogoInnerChild1 = (props: ChildrenType) => {
    return (
    <div className = "text-[#4D44E4] pr-2 ">

        {props.children}
    </div>
    )
}
export const BrandName = ({ children }: { children: string }) => {
    return (
        <h1 className="font-medium">
            {children}
        </h1>
    );
}


export const DashboardItemsContainer = ({children}: {children: ReactNode}) => {
        return (
                <div className = "pt-6">
                        {children}
                </div>
        )
}