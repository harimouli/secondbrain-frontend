
import { ShareIcon } from "../icons/ShareIcon"



interface CardProps {
    title: string;
    type: "document" | "youtube" | "twitter" | "linkedin";
    link: string
}

export const Card = ({title, type, link}: CardProps) => {
return (
 <div>
    <div className = "p-4 bg-white shadow-md max-w-72 rounded-md border-[#e9ebed]  border min-w-48 min-h-48">
            <div className = "flex justify-between items-center">
                <div className = "flex items-center text-md">
                    <div className = "text-slate-600 pr-2">
                        
                        {<ShareIcon size = {"md"}/>}
                    </div>
                    {title} 

                </div>
                <div className = "flex items-center text-slate-600">
                    <div className = "pr-2" >   
                        <a href = {link} target = "_blank"></a>
                        <ShareIcon size= {"md"}/>
                    </div>
                    <div>
                        <ShareIcon size = {"md"}/>
                    </div>
                </div>
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

