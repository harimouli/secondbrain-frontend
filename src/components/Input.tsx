
interface InputProps {
    placeholder : string;
    type: string;
    reference: any;

}

export const Input = (props: InputProps) => {
    return (
        <input ref = {props.reference} placeholder= {props.placeholder} type = {props.type} className = "py-3 px-3 border rounded-md m-2"></input>
    )
}