import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder : string;
    type: string;
    reference: React.RefObject<HTMLInputElement>;
    width?:string;
    id?:string

}

export const Input = (props: InputProps) => {
    const { id, placeholder, type, reference, width, ...rest } = props;
    return (
        <input
            id={id}
            ref={reference}
            placeholder={placeholder}
            type={type}
            required
            className={`py-3 px-3 border mr-2 border-slate-300  shadow  rounded-md outline-slate-500 ${width ? ` ${width}` : ""}`}
            {...rest}
        />
    );
}



