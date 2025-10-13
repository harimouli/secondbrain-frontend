


import { GrShare } from "react-icons/gr";
import axios from "axios";
import { BACKEND_URL } from "../config";

import { AiOutlineDelete } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TweetEmbed } from "./TweetEmbed";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { toast } from "react-toastify";

interface CardProps {
    title: string;
    type: "document" | "youtube" | "twitter" | "linkedin";
    link: string
    refreshContent: () => void;
}


export const Card = ({title, type, link, refreshContent}: CardProps) => {
   const deleteCard =  async () => {
        try { 
              const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
              if(!token) {
                return toast.error("Unauthorized access");
              }
                const response =    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                    data: {
                        link
                    },  
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
                if(response.status === 200){
                     refreshContent();
                    toast.success("deleted successfully!");
                }
                else{
                    toast.error("something went wrong!");  
                }

        }catch(err)    { 
            console.log(err);
        }
        
    }



return (
 
   <div className = {`hover:transition  hover:scale-104 duration-300 w-[290px] h-auto`}>

    <div className = {`p-4 bg-white shadow-md  rounded-md border-[#d3d4d5]  border`}>
            <div className = "flex justify-between items-center">
                <div className = "flex items-center text-md">
                    <div className = "pr-2">
                        {type === "youtube" && 
                            <FaYoutube  size = {25}/>
                        }
                        { type === "twitter" && 
                            <FaXTwitter/>
                        }
                    </div>
                    <h2 className = "font-medium">{title}</h2>

                </div>
                <div className = "flex items-center text-slate-600">
                    <div title = "Open" className = "pr-2 cursor-pointer text-gray-400" >
                         <a href = {link}  target = "_blank">
                                <GrShare   size = {20}/>
                        </a> 
                    </div>
                    <div title = "delete" className = "cursor-pointer text-gray-400 hover:text-red-500 transition ml-3" onClick={deleteCard}>
                        <AiOutlineDelete  size = {23}/>
                    </div>
                </div>
            </div>
            <div>

                <p></p>
            </div>
         <div className={`aspect-video w-full rounded  pt-4 ${type === "twitter" ? "h-[250px] overflow-y-scroll": ""}`}>

            {type === "youtube" && 

                <YoutubeEmbed link={link} />
            }  

            {type == "twitter" &&    
                   <TweetEmbed link= {link}/>
            }
        </div>
    </div>
    </div>
 
    )
}




