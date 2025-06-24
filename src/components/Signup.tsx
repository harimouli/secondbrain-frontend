
import { useRef } from "react"
import  axios  from "axios"
import { BACKEND_URL } from "../config"
import { Input } from "./Input"

import {Button} from "./Button"
import { useNavigate } from "react-router-dom"

import { AuthBody } from "../ui/AuthBody"

import { AuthButtonBody } from "../ui/AuthButtonBody"
import { InputWrapper } from "../ui/InputWrapper";

import { InputLabel } from "./InputLabel"

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


            try{
                const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, userData);
                navigate("/signin");
                alert(response.data.message + "!");
            }catch(error){
                 console.error("Signin failed", error);
            }
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, userData);
            navigate("/signin");
            alert(response.data.message + "!");

    }
    return(
                <AuthBody>
                 
                               <InputWrapper>
                                           <InputLabel htmlfor="username" labelText="Enter your username" />
                                            <Input reference = {usernameRef} type = {"text"} placeholder="username" /> 
                                           </InputWrapper>
                              <InputWrapper>
                                         <InputLabel htmlfor="password" labelText="Enter your password"/>
                                         <Input reference = {passwordRef} type = {"password"} placeholder="Password"/>
                              </InputWrapper>
                             <AuthButtonBody>
                                   <Button onClick={signup}   variant="primary" text = "Signup" size = "md" fullWidth = {false} loading={false}/>
                             </AuthButtonBody>
                                    
                       
                </AuthBody>
        
    );
}
