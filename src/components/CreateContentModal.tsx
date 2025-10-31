import { useRef} from "react";

import {ButtonVariant, ButtonSize} from "../types/button"
import { z } from "zod";
import { Button } from "./Button";
import { RxCross2 } from "react-icons/rx";

import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { InputLabel } from "./InputLabel";
import { toast } from "react-toastify";
import { ModelContainer, ModelContentContainer, ModelCrossContainer, } from "../ui/contentModelUI/CreateModel";
import type { ModalProps } from "../utils/Globaltypes";
import { useNavigate } from "react-router-dom";
const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter"
} as const;
type ContentType = typeof ContentType[keyof typeof ContentType];




export const CreateContentModal = ({ open, onClose, refreshContent }:  ModalProps) => {


    const titleRef = useRef<HTMLInputElement>(null!);
    const linkRef = useRef<HTMLInputElement>(null!);
    


    const navigate = useNavigate();

    const addContent = async () => {
            





        try {


            const title = titleRef.current?.value;

            const link = linkRef.current?.value;
            let  linkType: string  = ContentType.Youtube;


            if(link.includes("youtube.com") || link.includes("youtu.be")) {
                linkType = ContentType.Youtube;
            }

            if(link.includes("twitter.com") || link.includes("x.com")) {
                linkType = ContentType.Twitter;     
            }
            if(!title || title.trim() === "")
            {
               titleRef.current?.focus();
               titleRef.current?.classList.remove("border", "border-slate-300", "outline-slate-400", "outline-slate-500");
               titleRef.current?.classList.add("border", "border-red-500", "outline-red-500");
               toast.error("Please fill in all the fields");
               return;
           }
           if(!link || link.trim() === ""){
                linkRef.current?.focus();
                linkRef.current?.classList.remove( "border-slate-300", "outline-slate-400", "outline-slate-500");
                linkRef.current?.classList.add("border", "border-red-500", "outline-red-500");
                toast.error("Please fill in all the fields");
                return;
           }

           

            const contentDataSchema =  z.object( {
                title: z.string().min(2, "Title at least 2 characters long"),
                link: z.string().url().refine((url)=> {
                    if(url.includes("youtube.com") || url.includes("youtu.be")) {
                        return true;
                    }   
                    if(url.includes("twitter.com") || url.includes("x.com")) {
                        return true;
                    }    
                    return false; 
                }, {message: "we only support youtube and twitter links for now"}),
                type: z.enum([ContentType.Youtube, ContentType.Twitter])
            });
            
            type ContentData = z.infer<typeof contentDataSchema>;

            const contentData: ContentData = {
                title: title!,
                link: link!,
                type: linkType as ContentType
            }
            const parsedData = contentDataSchema.safeParse(contentData);
            if(!parsedData.success) {
                parsedData.error.issues.forEach(issue => {
                    toast.error(issue.message);
                });
                return;
            }
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if(!token) {
                toast.error("Unauthorized access");
                onClose(false);
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                navigate("/auth");
                return;
            }
            const response =  await axios.post(`${BACKEND_URL}/api/v1/content`, contentData, {
                headers: {
                    authorization: `Bearer ${token}` 
                }
            });  
            
            if(response.status === 401 || response.status === 403) {
                toast.error("Unauthorized access");
                onClose(false); 
                localStorage.removeItem("token");
                navigate("/auth");
                return;
            }
            onClose(false);
            toast.success("link added succesfully!");
            if (refreshContent) {
                refreshContent();
            }
        }catch {
            toast.warning("something  went wrong!");
            onClose(false);
            navigate("/auth");
            return;
        }
            
    }
    return (
        <>
            {open && (
                <ModelContainer>
                    <ModelContentContainer>
                        
                            <div className = "flex flex-col  items-center gap-1">  

                                 <div className="flex items-center w-[90%] pt-5"> 
   
                                    <div className = "w-[98%] pb-7 gap-2">
                                         <h1 className = "text-[18px] text-slate-800 font-semibold">
                                        Add New Content
                                        </h1>
                                        <p className = "text-[15px] text-slate-600">Save a video, tweet, link, or quick note to your Mind Space.</p>
                                    </div>
                                   
                                     <ModelCrossContainer onClose={onClose}>
                                    {<RxCross2  className = "cursor-pointer text-slate-600 cursor"  size = {25}/>}
                                     </ModelCrossContainer> 
                                    
                                </div>                    
                               
                                <div className = "p-1 flex flex-col w-[90%]">
                                     <InputLabel className = "text-slate-600 font-medium text-sm" labelText="Enter the Title:" htmlfor = "title"/>
                                     <div className = "mt-1">
                                                  <Input id = "title" width = "w-full" reference = {titleRef} type= {"text"} placeholder=  {"Title"}/>
                                     </div>
                                     <span className = "text-[12px] text-slate-500 mt-1">Keep it short and descriptive.</span>
                                </div>
                                <div className = "p-1 flex flex-col w-[90%]">
                                    <InputLabel className = "text-slate-600 font-medium text-sm" labelText="Enter the Link:" htmlfor = "link"/>
                                    <div className = "mt-1">
                                         <Input width = "w-full" reference={linkRef} type = {"text"} placeholder={"Link"} />
                                    </div>
                                    <span className = "text-[12px] text-slate-500 mt-1">Paste the full URL. We’ll fetch a preview automatically.</span>
                                </div>
                               
                               
                            </div>
            
                            <div className = "flex pt-2 w-[90%] justify-end gap-3">
                                <Button onClick={() => onClose(false)} variant = {ButtonVariant.Cancel} size = {ButtonSize.Small} text = {"Cancel"} />
                                <Button onClick={addContent} variant = {ButtonVariant.Primary} size = {ButtonSize.Small} text = {"Save"} />
                            </div>
                      

                    </ModelContentContainer>
                </ModelContainer>
            )}
        </>
    );
}
