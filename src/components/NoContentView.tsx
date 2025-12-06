import NoContent from "../../assets/noContent.png";
export const NoContentView = () => {
  return (
    <div className="flex  items-center justify-center h-screen text-4xl text-[#5d5e60]">
      <img src={NoContent} width={300} />
    </div>
  );
};
