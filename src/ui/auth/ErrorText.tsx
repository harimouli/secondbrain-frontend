


type ErrorTextProps = {
    message: string;
};

export const ErrorText = ({ message }: ErrorTextProps) => {
    return (
        <p className="text-red-700 pl-2 text-xs pt-0 mt-0">{`${message}`}</p>
    );
};