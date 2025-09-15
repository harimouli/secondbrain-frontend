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


type VariantStylesType = {
    primary: string;
    secondary: string;

}
const variantStyles: VariantStylesType = {
    "primary": "bg-[#6258DC] text-white",
    "secondary": "bg-[#E0E7FF] text-[#5046E3] border-1 border-[#5046E3]  hover:text-medium  transition-all duration-300",

} 
const defaultStyles = "rounded-md flex items-center  font-light"

const sizeStyles = {
    "sm": "py-2 px-2 text-md",
    "md": "py-2 px-2 text-md",
    "lg": "py-2 px-4 text-lg",
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.loading}
      onClick={props.onClick}
      className={`
        ${variantStyles[props.variant]} 
        ${defaultStyles} 
        ${sizeStyles[props.size]} 
        ${props.fullWidth ? "w-full" : "inline-flex"} 
        flex items-center justify-center ${props.size === "sm" ? "" : "gap-2"}
        ${props.loading ? "opacity-50 cursor-progress" : "cursor-pointer"}
      `}
    >
      {props.startIcon && (
        <span className="flex items-center justify-center">
          {props.startIcon}
        </span>
      )}
      <span>{props.text}</span>
      {props.endIcon && (
        <span className="flex items-center justify-center">
          {props.endIcon}
        </span>
      )}
    </button>
  );
};
