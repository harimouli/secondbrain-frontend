import {useRef, useState} from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

import { Input } from "./Input";
import { z } from "zod";

import { Button } from "./Button";



import { InputLabel } from "./InputLabel";

import { InputWrapper } from "../ui/auth/InputWrapper";


import { ErrorText } from "../ui/auth/ErrorText";

import { AuthButtonBody } from "../ui/auth/AuthButtonBody";

export const Signin = () => {
        const [nameError, setNameError] = useState("");
        const [passwordError, setPasswordError] = useState("");
        const [errorStatus, setErrorStatus] = useState(false);
        const [signinError, setSigninError] = useState("");
        
       
        const usernameRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const  navigate = useNavigate();

        /*useEffect(()=> {
                const token = localStorage.getItem("token");
                if(token){
                    navigate("/dashboard");
                    return;
                }
        },[navigate])*/
       

       const signin = async() => {

            
            const username = usernameRef.current?.value;
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
            }
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
                const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, userData);
                const token = response.data.token;
                localStorage.setItem("token", token);
                navigate("/dashboard");
           }catch{
                setSigninError("Invalid credentials or server error");
                setErrorStatus(!errorStatus)
           }
        }



        return (


                <>
                
                
            

                           <InputWrapper>
                                   <InputLabel htmlfor="username" labelText="Enter your username" />
                                 <Input  id = "username" width="w-80" reference={usernameRef} type="text" placeholder="Username" />
                                 {errorStatus && 
                                      <ErrorText message= {nameError}/>
                                 }
                          </InputWrapper>
                        
                                
                          <InputWrapper>
                                 <InputLabel htmlfor="password" labelText="Enter your password"/>
                                 <Input id = "password" width="w-80" reference={passwordRef} type="password" placeholder="Password" />
                                 {errorStatus && 
                                       <ErrorText message= {passwordError}/>
                                 }
                         </InputWrapper>
                                {errorStatus && 
                                     <ErrorText message={signinError}/>
                                 }
                        

                          <AuthButtonBody>
                                    <Button
                                onClick={signin}
                                variant="primary"
                                text="Signin"
                                size="md"
                                fullWidth={false}
                                loading={false}
                                />

                          </AuthButtonBody>
                            
            </>

        )
    }