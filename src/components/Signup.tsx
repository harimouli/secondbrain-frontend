
import { useRef, useState, useEffect } from "react"
import  axios  from "axios"
import { BACKEND_URL } from "../config"
import { Input } from "./Input"

import {Button} from "./Button"
import { useNavigate } from "react-router-dom"

import { AuthBody } from "../ui/AuthBody"

import { AuthButtonBody } from "../ui/AuthButtonBody"
import { InputWrapper } from "../ui/InputWrapper";

import { InputLabel } from "./InputLabel"
import {z} from "zod"

import { ErrorText } from "../ui/ErrorText"

export const Signup = () => {
    const usernameRef =  useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
    const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

     const [nameError, setNameError] = useState("");
     const [passwordError, setPasswordError] = useState("");
     const [errorStatus, setErrorStatus] = useState(false);
            

    const navigate = useNavigate();
     useEffect(()=> {
                    const token = localStorage.getItem("token");
                    if(token){
                        navigate("/dashboard");
                        return;
                    }
            },[])


    const signup = async () => {
        const username  = usernameRef.current?.value;
        const password = passwordRef.current?.value;


        const userSchema = z.object({
                        username: z.string().
                                  min(3, "username is too small"),
                       password: z.string().min(8)
                                .regex(/[A-Z]/, "Password must contain an uppercase letter")
                               .regex(/[a-z]/, "Password must contain a lowercase letter"),
        
                    })

            type userDataType = z.infer<typeof userSchema>;
            const userData: userDataType = {
                username,
                password
            };

            const parsedData = userSchema.safeParse(userData);
            if(!parsedData.success) {
                parsedData.error.issues.forEach(issue => {
                    if (issue.path[0] === "username") {
                        setNameError(issue.message);
                        setErrorStatus(!errorStatus);
                    }
                    if (issue.path[0] === "password") {
                        setPasswordError(issue.message);
                        setErrorStatus(!errorStatus);
                    }
                 });
                return;
            }
             

         setNameError("");
         setPasswordError("");
         setErrorStatus(false);
            



            try{
                const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, userData);
                navigate("/signin");
                alert(response.data.message + "!");
            }catch(error){
                 console.error("Signin failed", error);
            }

    }
    return(
                <AuthBody>
                 
                               <InputWrapper>
                                           <InputLabel htmlfor="username" labelText="Enter your username" />
                                            <Input reference = {usernameRef} type = {"text"} placeholder="username" />
                                             {errorStatus && 
                                                <ErrorText message= {nameError}/>
                                            } 
                                </InputWrapper>
                              <InputWrapper>
                                         <InputLabel htmlfor="password" labelText="Enter your password"/>
                                         <Input reference = {passwordRef} type = {"password"} placeholder="Password"/>
                                         {errorStatus && 
                                                <ErrorText message= {passwordError}/>
                                        }
                              </InputWrapper>
                             <AuthButtonBody>
                                   <Button onClick={signup}   variant="primary" text = "Signup" size = "md" fullWidth = {false} loading={false}/>
                             </AuthButtonBody>
                                    
                       
                </AuthBody>
        
    );
}
