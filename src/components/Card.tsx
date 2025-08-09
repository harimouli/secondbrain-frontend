


import { GrShare } from "react-icons/gr";
import axios from "axios";
import { BACKEND_URL } from "../config";

import { AiOutlineDelete } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { XtypeIcon } from "../icons/XtypeIcon";
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
                const response =    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                    data: {
                        link
                    },  
                    headers: {
                        authorization: localStorage.getItem("token")
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
                            <FaYoutube color="red" size = {25}/>
                        }
                        { type === "twitter" && 
                            <XtypeIcon/> 
                        }
                    </div>
                    <h2 className = "font-medium">{title}</h2>

                </div>
                <div className = "flex items-center text-slate-600">
                    <div className = "pr-2 cursor-pointer" >
                         <a href = {link} target = "_blank">
                                <GrShare  size = {20}/>
                        </a> 
                    </div>
                    <div className = "cursor-pointer text-gray-400 hover:text-red-500 transition ml-3" onClick={deleteCard}>
                        <AiOutlineDelete size = {23}/>
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




