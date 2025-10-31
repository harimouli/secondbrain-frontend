

import { type ChildrenType } from "../../utils/Globaltypes"


export const ModelContainer = (props: ChildrenType) => {
    return (
        <div className="w-screen h-screen  fixed bg-black/50 flex justify-center items-center top-0 left-0" >
                {props.children}
        </div>
    );
};


export const ModelContentContainer = (props: ChildrenType) => {
    return (
       <div className = " flex flex-col   bg-white opacity-100 rounded-lg shadow-xl transition-all ease-in-out duration-700 w-[90%] h-[55%] md:h-[450px] lg:h-[75%] md:w-[500px] lg:w-[500px]">
            {props.children}
        </div>
    );
};





type ModelCrossContainerProps = ChildrenType & {
    onClose: (value: boolean) => void;
};

export const ModelCrossContainer = (props: ModelCrossContainerProps) => {
    return (
        <div className="flex justify-end mb-15">
            <div className="cursor-pointer" onClick={() => props.onClose(false)}>
                {props.children}
            </div>
        </div>
    );
}