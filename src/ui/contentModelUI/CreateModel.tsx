

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
       <div className = " flex flex-col items-center justify-center bg-white opacity-100 rounded-lg shadow-xl transition-all ease-in-out duration-700 w-[90%] h-[60%] md:h-[500px] lg:w-[500px] ">
            {props.children}
        </div>
    );
};



export const ModelMainInnerContainer = (props: ChildrenType) => {
    return (
       <span className = "rounded  w-[100%]">
            {props.children}
        </span>
    );
};


type ModelCrossContainerProps = ChildrenType & {
    onClose: (value: boolean) => void;
};

export const ModelCrossContainer = (props: ModelCrossContainerProps) => {
    return (
        <div className="flex justify-end w-full">
            <div className="cursor-pointer" onClick={() => props.onClose(false)}>
                {props.children}
            </div>
        </div>
    );
}