import { useState } from "react"
import { Button } from "./Button"




import { Signin } from "./Signin"
import { Signup } from "./Signup"

export const AuthMain = () => {
    const [authMode, setAthMode] = useState("Signin");

    
    return (
        <div className = "bg-white flex justify-center items-center h-screen w-screen">

            <div className = "flex flex-col bg-white shadow-lg p-5   rounded-lg border-2 border-slate-300">
                    <div className = "flex items-center justify-center mb-5">
                       <div className = "p-2">
                                <Button onClick={()=> {
                                    setAthMode("Signin");
                                }} variant= {`${authMode === "Signin" ? "primary" : "secondary"}`} text = "Signin"  size = "md"/> 
                       </div>
                        
                        <div className = "p-3">
                            <Button 
                             onClick={()=>{
                                setAthMode("Signup")
                             }}
                            variant={`${authMode === "Signup" ? "primary" : "secondary"}`} text = "Signup"  size = "md"/>
                        </div>
                       
                    </div>
                    <div className = "flex items-center flex-col justify-center p-2">

                        {authMode == "Signin" && 
                            <Signin   />
                        }
                        {authMode == "Signup" && 
                            <Signup setAuthMode={setAthMode}/>    
                        }
                    </div>
            </div>

        </div>
    )
}