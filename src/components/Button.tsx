import type { ReactElement } from "react";


export enum ButtonVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tri = "tri",
    Default = "default",
    Cancel = "cancel"
}

export enum ButtonSize {
    Small = "sm",
    Medium = "md",
    Large = "lg",
    MinSmall = "min-sm"
}

interface ButtonProps {
    variant: ButtonVariant;
    text: string;
    size: ButtonSize;
    startIcon?: ReactElement;
    endIcon?: ReactElement;   
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
     
}


type VariantStylesType = {
    [key in ButtonVariant]: string;
};
const variantStyles: VariantStylesType = {
    [ButtonVariant.Primary]: "bg-[#6258DC] text-white",
    [ButtonVariant.Secondary]: "bg-[#E0E7FF] text-[#5046E3] border-1 border-[#5046E3]  hover:text-medium  transition-all duration-300",
    [ButtonVariant.Tri]: "bg-white text-slate-700 font-medium  shadow-sm",
    [ButtonVariant.Cancel]: "bg-red-500 text-white hover:bg-red-600 transition-all duration-300",
    [ButtonVariant.Default]: "text-slate-700"
};
const defaultStyles = "rounded-md flex items-center  font-light"

const sizeStyles = {
    [ButtonSize.Small]: "py-2 px-2 text-sm font-medium",
    [ButtonSize.Medium]: "py-2 px-2 text-md",
    [ButtonSize.Large]: "py-2 px-4 text-lg",
    [ButtonSize.MinSmall]: "py-1 px-2 text-sm font-medium"
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
