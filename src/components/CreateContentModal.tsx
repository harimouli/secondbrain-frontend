import { useRef, useState } from "react";


import { Button } from "./Button";
import { RxCross2 } from "react-icons/rx";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { InputLabel } from "./InputLabel";
import { toast } from "react-toastify";
import { ModelContainer, ModelContentContainer, ModelCrossContainer, ModelMainInnerContainer } from "../ui/contentModelUI/CreateModel";
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
    const [type, setType] = useState<ContentType>(ContentType.Youtube);


    const navigate = useNavigate();

    const addContent = async () => {
            
        try {
             const title = titleRef.current?.value;
            const link = linkRef.current?.value;
            const contentData = {
                title,
                link,
                type
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
                        <ModelMainInnerContainer>
                           <ModelCrossContainer onClose={onClose}>
                                    {<RxCross2   size = {20}/>}
                            </ModelCrossContainer>
                            <div className = "flex flex-col items-center">
                                <div className = "p-2 flex flex-col">
                                     <InputLabel labelText="Enter the Title:" htmlfor = "title"/>
                                     <div className = "mt-1">
                                                  <Input id = "title" width = "w-83" reference = {titleRef} type= {"text"} placeholder=  {"Title"}/>
                                     </div>
        
                                </div>
                                <div className = "p-2 flex flex-col">
                                    <InputLabel labelText="Enter the Link:" htmlfor = "link"/>
                                    <div className = "mt-1">
                                         <Input width = "w-83" reference={linkRef} type = {"text"} placeholder={"Link"} />
                                    </div>
                                    
                                </div>
                               
                                <div className = "flex flex-wrap gap-3 items-center justify-center">
                                        <Button onClick={()=> {
                                            setType(ContentType.Youtube)
                                        }}  variant= {type == ContentType.Youtube ? "primary": "secondary"} 
                                        text = "youtube" size="md"/>
                                        <Button
                                        onClick={() => {
                                            setType(ContentType.Twitter)
                                        }}
                                         variant= {type == ContentType.Twitter ? "primary": "secondary"} text="twitter" size = "md"/>
                                          
                                </div>
                            </div>
                            <div className = "flex justify-center pt-4">
                                <Button onClick={addContent} variant = {"primary"} size = {"md"} text = {"Submit"} />
                            </div>
                       </ModelMainInnerContainer>

                    </ModelContentContainer>
                </ModelContainer>
            )}
        </>
    );
}
