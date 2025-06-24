

import { type  ReactNode } from "react"; 

export const InputWrapper = ({children}: {children:ReactNode}) =>{ 
    return (
         <div className = "flex flex-col gap-2  w-80">
                {children}
         </div>
    )
}