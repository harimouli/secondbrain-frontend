
import { useRef } from "react"
import  axios  from "axios"
import { BACKEND_URL } from "../config"
import { Input } from "./Input"

import {Button} from "./Button"
import { useNavigate } from "react-router-dom"

import { AuthBody } from "./AuthBody"

export const Signup = () => {
    const usernameRef =  useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
    const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
    const navigate = useNavigate();
    const signup = async () => {
        const username  = usernameRef.current?.value;
        const password = passwordRef.current?.value;
            const userData = {
                username,
                password
            };
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, userData);
            navigate("/signin");
            alert(response.data.message + "!");

    }
    return(
                <AuthBody>
                   <div className = "gap-2 p-2">
                        <div className = "flex flex-col gap-1 w-80">
                                <Input reference = {usernameRef} type = {"text"} placeholder="username" />
                                <Input reference = {passwordRef} type = {"password"} placeholder="Password"/>
                                      <div  className = "flex justify-center pt-4 w-full">
                                        <Button onClick={signup}   variant="primary" text = "Signup" size = "md" fullWidth = {false} loading={false}/>
                                    </div>
                        </div>
        
                    </div>
                </AuthBody>
        
    );
}
