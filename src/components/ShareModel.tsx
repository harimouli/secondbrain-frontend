import { ModelContainer, ModelContentContainer, ModelCrossContainer } from "../ui/contentModelUI/CreateModel"
import { RxCross2 } from "react-icons/rx";
import type { ModalProps } from "../utils/Globaltypes";

export const ShareModel = (props: ModalProps) => {




    return (
        props.open ? (
            <ModelContainer>
                <ModelContentContainer>
                  
                        <ModelCrossContainer onClose={props.onClose}>
                            {<RxCross2  size = {20}/>}
                        </ModelCrossContainer>
                        <h1>Share Content</h1>
                        <p>Currently Working on Sharing Content</p>
                        <p>due to time constraints, this feature is not yet implemented.</p>
                 
                </ModelContentContainer>
            </ModelContainer>
        ) : null
    );
}
