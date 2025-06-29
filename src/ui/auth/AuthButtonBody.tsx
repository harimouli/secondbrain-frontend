import { type ReactNode } from "react"


export const AuthButtonBody = ({children}: {children :ReactNode}) => {
    return (
         <div className="flex pt-1 mt-3">
            {children}
         </div>
    )
}