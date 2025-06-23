

import { type  ReactNode } from "react";

export const AuthBody = ({ children }: { children: ReactNode }) => {

    return (


     <div className = "flex items-center justify-center bg-[#6258DC] h-screen w-screen">

     
        <div className = "flex flex-col items-center gap-4   p-6 bg-white shadow-md rounded-2xl border-1 border-slate-400">
                    <div className = "mb-3 p-2 flex justify-center flex-col items-center">
        
                            <p className="text-slate-500 text-xl font-medium">Welcome to</p>
                          <h2 className="text-2xl font-extrabold text-[#6258DC]">Second Brain</h2>
                  
                    </div>

                    <div className = "flex flex-col items-center gap-2 p-2">
                        <div className = "flex flex-col items-center  gap-2 w-80">

                                {children}
                        </div>

                    </div>
        </div>
     </div>
                    
                    
                     
        
        
        )
    }
