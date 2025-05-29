import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    size: "md" | "lg" | "sm"
    startIcon?: ReactElement;
    endIcon?: ReactElement;   
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

/*interface VariantStylesType {
    primary: string;
    secondary: string;
} */
type VariantStylesType = {
    primary: string;
    secondary: string;
}
const variantStyles: VariantStylesType = {
    "primary": "bg-[#5046E3] text-white",
    "secondary": "bg-[#E0E7FF] text-[#5046E3]"
}
const defaultStyles = "rounded-md flex items-center  font-light"

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

export const Button  = (props: ButtonProps) =>{
    return <button  disabled = {props.loading} 
    onClick={props.onClick} 
    className = {`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullWidth ? "w-full flex justify-center" : ""} ${props.loading ? "opacity-50" : ""} ${props.loading ? "cursor-progress" : "cursor-pointer"}`}>
        {props.startIcon ? <div className = "pr-2">{props.startIcon}</div> : null}  {props.text} {props.endIcon ? <div className = "pl-2">{props.endIcon}</div> : null}
    </button>
}