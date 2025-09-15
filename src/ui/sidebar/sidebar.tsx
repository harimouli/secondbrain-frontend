  import { type ChildrenType } from "../../utils/Globaltypes"
  
  export const MainLogoBody = (props: ChildrenType) => {
            return (
                <div className = "flex text-xl  items-center">
                    {props.children}
                </div>
            )
    }

export const BrandName = ({ children }: { children: string }) => {
            return (
                <h1 className="font-semibold text-xl text-foreground text-pretty pl-2">{children}</h1>          

            );
   }        