import {useRef, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

import { Input } from "./Input";
import { z } from "zod";

import { Button } from "./Button";

import { AuthBody } from "./AuthBody";

import { InputLabel } from "./InputLabel";
export const Signin = () => {
        const [nameError, setNameError] = useState("");
        const [passwordError, setPasswordError] = useState("");
        console.log(nameError, passwordError);
        const usernameRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const  navigate = useNavigate();
       // to get rid of these typo errors
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
                if(parsedData.error.issues[0]){
                    console.log(parsedData.error.issues[0])
                    setNameError(parsedData.error.issues[0].message);
                }
                if(parsedData.error.issues[1]){
                    setPasswordError(parsedData.error.issues[1].message);
                }
            }


            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, userData);
            
            const token = response.data.token;
            localStorage.setItem("token", token);
            console.log(response);
            navigate("/dashboard");

        }



        return (


                <AuthBody>

                            <div className = "flex flex-col gap-2  w-80">
                                   <InputLabel htmlfor="username" labelText="Enter your username" />
                                 <Input  id = "username" width="w-80" reference={usernameRef} type="text" placeholder="Username" />
                            </div>
                        
                                
                            <div className = "flex flex-col gap-2 w-80">
                                 <InputLabel htmlfor="password" labelText="Enter your password"/>
                                 <Input id = "password" width="w-80" reference={passwordRef} type="password" placeholder="Password" />
                       
                            </div>  
                    

                            <div className="flex pt-1">
                                <Button
                                onClick={signin}
                                variant="primary"
                                text="Sign In"
                                size="md"
                                fullWidth={false}
                                loading={false}
                                />
                            </div>
            </AuthBody>

        )
    }