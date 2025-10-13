import {useEffect, useState } from "react"
import { Button } from "./Button"
import { ButtonSize, ButtonVariant } from "./Button";


import { useNavigate } from "react-router-dom";
import { Signin } from "./Signin"
import { Signup } from "./Signup"

export const AuthMain = () => {
    const [authMode, setAthMode] = useState("Signin");
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    const navigate = useNavigate();
    useEffect(() => {
        if(token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    return (
        <div className = "bg-white flex justify-center items-center h-screen w-screen">

            <div className = "flex flex-col bg-white shadow-lg p-5   rounded-lg border-2 border-slate-300">
                    <div className = "flex items-center justify-center mb-5">
                       <div className = "p-2">
                                <Button onClick={()=> {
                                    setAthMode("Signin");
                                }} variant={authMode === "Signin" ? ButtonVariant.Primary : ButtonVariant.Secondary} text="Signin" size={ButtonSize.Medium} />
                       </div>
                        
                        <div className = "p-3">
                            <Button 
                             onClick={()=>{
                                setAthMode("Signup")
                             }}
                            variant={authMode === "Signup" ? ButtonVariant.Primary : ButtonVariant.Secondary} text="Signup" size={ButtonSize.Medium}/>
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