
import { OpenIcon } from "../icons/OpenIcon";

import { DeleteIcon } from "../icons/DeleteIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";


import  {YoutubeTypeIcon} from "../icons/YoutubeTypeIcon"
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
                    toast.success("deleted successfully!");
                    refreshContent();

                }
                else{
                    toast.error("something went wrong!");  
                }

        }catch(err)    { 
            console.log(err);
        }
        
    }

return (
 
   <div className = "hover:transition ease-in-out hover:scale-104 duration-500">
    <div className = "p-4 bg-white shadow-md max-w-72 rounded-md border-[#d3d4d5]  border min-w-48 min-h-48">
            <div className = "flex justify-between items-center">
                <div className = "flex items-center text-md">
                    <div className = "text-slate-600 pr-2">
                        {type === "youtube" && 
                             <YoutubeTypeIcon/> 
                        }
                        { type === "twitter" && 
                            <XtypeIcon/> 
                        }
                    </div>
                    <h2 className = "font-normal">{title}</h2>

                </div>
                <div className = "flex items-center text-slate-600">
                    <div className = "pr-2 cursor-pointer" >
                         <a href = {link} target = "_blank">
                                <OpenIcon size = "md"/>
                        </a> 
                    </div>
                    <div onClick={deleteCard}>
                        <DeleteIcon size = {"md"}/>
                    </div>
                </div>
            </div>
            <div>

                <p></p>
            </div>
         <div className = "pt-4 ">

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




