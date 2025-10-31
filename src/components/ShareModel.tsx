import { ModelContainer, ModelContentContainer, ModelCrossContainer } from "../ui/contentModelUI/CreateModel"
import { RxCross2 } from "react-icons/rx";
import type { ModalProps } from "../utils/Globaltypes";

export const ShareModel = (props: ModalProps) => {




    return (
        props.open ? (
            <ModelContainer>
                <ModelContentContainer>
                  
                        <div className = "flex flex-col justify-between  items-center">
                               
                             <div className = "flex items-center w-[90%] pt-4">
                                   <div className = "w-[98%] gap-1">
                                    <h1 className = "text-[18px] text-slate-800 font-semibold">Share your mind</h1>
                                    <p className = "text-slate-600 text-[15px]">Generate a shareable link to  share your Mind Space.</p>
                                </div>
                                 <ModelCrossContainer onClose={props.onClose}>
                                    {<RxCross2  size = {20}/>}
                                </ModelCrossContainer>
                             </div>
                        </div>
                        

                </ModelContentContainer>
            </ModelContainer>
        ) : null
    );
}
