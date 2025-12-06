interface InputLabelProps {
  htmlfor: string;
  labelText: string;
  className?: string;
}

export const InputLabel = (props: InputLabelProps) => {
  return (
    <label className={`${props.className}`} htmlFor={props.htmlfor}>
      {props.labelText}
    </label>
  );
};
