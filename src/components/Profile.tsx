

import axios from "axios"
import {useEffect, useRef, useState} from "react"
import { BACKEND_URL } from "../config";

import { IoPersonCircleSharp } from "react-icons/io5";
import { Input } from "./Input";
import { LogoutButton } from "./LogoutButton";
import { Button } from "./Button";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
        const oldPasswordRef = useRef<HTMLInputElement>(null!);
        const newPasswordRef = useRef<HTMLInputElement>(null!);
        const navigate = useNavigate();
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        console.log("Token in profile page:", token);
        const [userName, setUsername] = useState("");
        //const [totalLinks, setTotalLinks] = useState(0);  /// will be addeed soooon.....................
        const [dateOfJoined, setDateJoined] = useState("");
        useEffect(() => {
             if (!token) return;

                const fetchUserData = async () => {
                    try {
                    const response = await axios.post(
                        `${BACKEND_URL}/api/v1/user-meta-data`,
                        {},
                        {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                        }
                    );

                    setUsername(response.data.username);
                    setDateJoined(response.data.dateOfJoined);
                    } catch (error) {
                    console.error("Error fetching user data:", error);
                    }
                };

          fetchUserData();
        }, [token]);

    const backToHome = () => {
        navigate("/dashboard")
    }

    return (

        <div className = "flex flex-col items-center justify-center md:justify-start bg-slate-100 h-screen w-screen">


            <div className = "absolute top-0 left-0 p-4">

                <Button  
                 text = {"Back"} 
                 variant = {"primary"} 
                 size = "md" 
                 startIcon = {<IoArrowBackCircleOutline 
                 size ={25}/>}
                 onClick={backToHome}
                 />
            </div>
            <div>
                <IoPersonCircleSharp size = "md"/>
            </div>
            <div className = "text-center">

               <h2>Username: {userName}</h2>
               <h3>Joined at : {dateOfJoined ? new Date(dateOfJoined).toLocaleDateString() : ""}</h3>
            </div>
            <div className = "flex flex-col p-5 gap-4">
                <div>
                    <h2 className = "font-bold text-slate-700">Change Password:</h2>
                </div>
                <div> 
                    <Input reference={oldPasswordRef} width = "w-83" type = "text"  placeholder="Old Password"/>
                </div>
                <div>
                    <Input reference={newPasswordRef} width = "w-83" type = "text" placeholder="New Password" />
                </div>
            </div>

            <div>
                <LogoutButton/>
            </div>
            
        </div>
    )
}

