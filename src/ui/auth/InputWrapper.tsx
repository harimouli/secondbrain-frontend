

import { type  ReactNode } from "react"; 

export const InputWrapper = ({children}: {children:ReactNode}) =>{ 
    return (
         <div className = "flex flex-col gap-2 p-1  w-80">
                {children}
         </div>
    )
}