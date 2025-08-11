

import { type ChildrenType } from "../../utils/Globaltypes"


export const ModelContainer = (props: ChildrenType) => {
    return (
        <div className="w-screen h-screen fixed bg-black/50 flex justify-center items-center top-0 left-0" >
                {props.children}
        </div>
    );
};


export const ModelContentContainer = (props: ChildrenType) => {
    return (
       <div className = "flex flex-col justify-center bg-white opacity-100 rounded-lg shadow-xl">
            {props.children}
        </div>
    );
};



export const ModelMainInnerContainer = (props: ChildrenType) => {
    return (
       <span className = "bg-white rounded p-8">
            {props.children}
        </span>
    );
};


type ModelCrossContainerProps = ChildrenType & {
    onClose: (value: boolean) => void;
};

export const ModelCrossContainer = (props: ModelCrossContainerProps) => {
    return (
        <div className="flex justify-end">
            <div className="cursor-pointer" onClick={() => props.onClose(false)}>
                {props.children}
            </div>
        </div>
    );
}