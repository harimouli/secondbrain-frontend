import { useParams } from "react-router-dom";

import { usePublicContent } from "../hooks/usePublicContent";

export const PublicContent = () => {
  const { hash } = useParams<{ hash: string }>();

  const [publicData, refreshPublicData, loading] = usePublicContent(hash!);
  // Custom hook to fetch public content based on hash
  console.log("Public Data:", publicData);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold mb-4">
          Loading Public Content...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Public Content</h1>
      <p className="text-slate-600">
        This is where public content will be displayed.
      </p>
      <button
        onClick={refreshPublicData}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Refresh Friend Mind
      </button>
    </div>
  );
};
