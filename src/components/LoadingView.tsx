import { ClipLoader } from "react-spinners";

export const LoadingView = () => {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <ClipLoader color="#6258DC" size={40} className="sm:size-60" />
    </div>
  );
};
