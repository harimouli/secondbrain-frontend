




interface InputLabelProps {
    htmlfor: string;
    labelText:string;

}


export const InputLabel = (props: InputLabelProps) => {

    return (

          <label className = " text-slate-500 text-sm font-medium" htmlFor = {props.htmlfor}>{props.labelText}</label>
    )
}