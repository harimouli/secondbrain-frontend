

import axios from "axios"
import {useEffect, useRef, useState} from "react"
import { BACKEND_URL } from "../config";

import { IoPersonCircleSharp } from "react-icons/io5";
import { Input } from "./Input";
import { LogoutButton } from "./LogoutButton";
export const Profile = () => {
        const oldPasswordRef = useRef<HTMLInputElement>(null!);
        const newPasswordRef = useRef<HTMLInputElement>(null!);

        
        const [userName, setUsername] = useState("");
        //const [totalLinks, setTotalLinks] = useState(0);
        const [dateOfJoined, setDateJoined] = useState("");
        useEffect(()=> {
            fetchUserData()
        }, [])

    const fetchUserData = async () => {

        
        const response = await axios.post(
            `${BACKEND_URL}/api/v1/user-meta-data`,
            {},
            {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
        );
        console.log(response.data);
        setUsername(response.data.username);
        setDateJoined(response.data.dateOfJoined);
       
    }  


    return (

        <div className = "flex flex-col items-center  bg-slate-100 h-screen w-screen">
            <div>
                <IoPersonCircleSharp size = "md"/>
            </div>
            <div className = "text-center">

               <h2>Username: {userName}</h2>
               <h3>Joined at : {dateOfJoined}</h3>
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

