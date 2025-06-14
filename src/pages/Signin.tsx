import { Input } from "../components/Input"
import {z} from "zod"
import {Button} from "../components/Button"
import {useRef, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Signin = () => {
        const [nameError, setNameError] = useState("");
        const [passwordError, setPasswordError] = useState("");

        const usernameRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const passwordRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const  navigate = useNavigate();
       // to get rid of these typo errors
        console.log(nameError);
        console.log(passwordError);
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
        <div className = "h-screen w-screen bg-slate-100 flex flex-col  justify-center items-center">
                    <div className = " flex flex-col  bg-white rounded-md shadow-lg p-4 md:w-md">

                                <div className = "">
                                     <p className = "text-black text-lg">Welcome  to</p>
                                     <h2 className = "text-2xl  font-extrabold text-[#6258DC]">Second Brain</h2>
                                </div>
                            <div className="flex flex-col align-middle p-2">
                                <Input reference={usernameRef} type = {"text"} placeholder="username" />
                                <Input reference={passwordRef} type = {"password"} placeholder="Password"/>
                                <div className = "flex justify-center pt-4 w-full">
                                        <Button onClick ={signin}  variant="primary" text = "Signin" size = "md" fullWidth = {true} loading={false}/>
                                </div>
                            </div>
            
                    </div>
        </div>
    )
}