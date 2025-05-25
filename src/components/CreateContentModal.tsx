import { CrossIcon } from "../icons/CrossIcon";

import { Button } from "./Button";

interface CreateContentModalProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

export const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {
    return (
        <>
            {open && (
                <div className="w-screen h-screen fixed bg-slate-500 opacity-60 flex justify-center items-center top-0 left-0 modal hide" id = "idModel" data-backdrop="static" data-keyboard ="false">
                    <div className = "flex flex-col justify-center bg-white opacity-100">
                        <span className = "bg-white rounded p-4">
                            <div className = "flex justify-end ">
                                <div onClick = {() => onClose(false)}>
                                    {<CrossIcon  size = {"lg"}/>}
                                </div>  
                            </div>
                            <div className = "flex flex-col">
                                <Input type= {"text"} placeholder=  {"Title"}/>
                                <Input type = {"text"} placeholder={"Link"} />
                            </div>
                            <div className = "flex justify-center">
                                <Button variant = {"primary"} size = {"md"} text = {"Submit"} />
                            </div>
                        </span>

                    </div>
                </div>
            )}
        </>
    );
}

interface InputProps {
    placeholder : string;
    type: string;

}
export const Input = (props: InputProps) => {
    return (
        <input placeholder= {props.placeholder} type = {props.type} className = "py-3 px-3 border rounded-md m-2"></input>
    )
}