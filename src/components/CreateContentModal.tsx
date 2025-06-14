import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";

import { Button } from "./Button";

import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";


interface CreateContentModalProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter"
} as const;
type ContentType = typeof ContentType[keyof typeof ContentType];

export const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {


    const titleRef = useRef<HTMLInputElement>(null!);
    const linkRef = useRef<HTMLInputElement>(null!);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);




    const addContent = async () => {
            const title = titleRef.current?.value;
            const link = linkRef.current?.value;
            const contentData = {
                title,
                link,
                type
            }
            const token = localStorage.getItem("token");
            await axios.post(`${BACKEND_URL}/api/v1/content`, contentData, {
                headers: {
                    authorization: token 
                }
            });
            
            onClose(false);

            
            
    }
    return (
        <>
            {open && (
                <div className="w-screen h-screen fixed bg-black/50 flex justify-center items-center top-0 left-0" >
                    <div className = "flex flex-col justify-center bg-white opacity-100 rounded-lg shadow-xl">
                        <span className = "bg-white rounded p-4">
                            <div className = "flex justify-end ">
                                <div onClick = {() => onClose(false)}>
                                    {<CrossIcon  size = {"lg"}/>}
                                </div>  
                            </div>
                            <div className = "flex flex-col">
                                <Input reference = {titleRef} type= {"text"} placeholder=  {"Title"}/>
                                <Input reference={linkRef} type = {"text"} placeholder={"Link"} />
                                <div className = "flex flex-wrap gap-3 items-center justify-center">
                                        <Button onClick={()=> {
                                            setType(ContentType.Youtube)
                                        }}  variant= {type == ContentType.Youtube ? "primary": "secondary"} 
                                        text = "youtube" size="sm"/>
                                        <Button
                                        onClick={() => {
                                            setType(ContentType.Twitter)
                                        }}
                                         variant= {type == ContentType.Twitter ? "primary": "secondary"} text="twitter" size = "sm"/>
                                          
                                </div>
                            </div>
                            <div className = "flex justify-center pt-4">
                                <Button onClick={addContent} variant = {"primary"} size = {"md"} text = {"Submit"} />
                            </div>
                        </span>

                    </div>
                </div>
            )}
        </>
    );
}
