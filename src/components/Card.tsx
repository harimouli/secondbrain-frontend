
import { OpenIcon } from "../icons/OpenIcon";

import { DeleteIcon } from "../icons/DeleteIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";


import  {YoutubeTypeIcon} from "../icons/YoutubeTypeIcon"
import { XtypeIcon } from "../icons/XtypeIcon";

//import { useEffect } from "react";


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
                    alert("deleted successufully!");
                    refreshContent();

                }
                else{
                    alert("Something wrong bhai!");
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
            <iframe 
            className = "w-full"
            src= {`http://www.youtube.com/embed/${link.split("?v=")[1]}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen> 

            </iframe> }

            {type == "twitter" &&
                    <blockquote className="twitter-tweet">
                        <a href= {link.replace("x", "twitter")}></a> 
                    </blockquote>
            }
        </div>
    </div>
    </div>
 
    )
}




