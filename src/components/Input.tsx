import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: string;
  reference: React.RefObject<HTMLInputElement>;
  width?: string;
  id?: string;
  className?: string;
}

export const Input = (props: InputProps) => {
  const { id, placeholder, type, reference, width, className, ...rest } = props;
return (
    <input
      id={id}
      ref={reference}
      placeholder={placeholder}
      type={type}
      required
      className={`${className} py-2 sm:py-3 px-2 sm:px-3 mr-1 sm:mr-2 rounded-md border border-slate-300 outline-[#6258DC] text-sm sm:text-base ${width ? ` ${width}` : "w-full"}`}
      {...rest}
    />
  );
};
