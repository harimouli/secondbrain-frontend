import type { ModalProps } from "../utils/Globaltypes";
import { Share2 } from "lucide-react";
import CopyField from "./CopyField";
import { BrainModal } from "./BrainModel";
export const ShareModel = (props: ModalProps) => {
  return props.open ? (
    <BrainModal open={props.open} onClose={() => props.onClose(false)}>
      <div className="flex flex-col justify-between  items-center">
        <div className="flex items-center w-[100%] pt-2">
          <div className="w-[100%] gap-1">
            <h1 className=" sm:text-[15px] md:text-[20px] text-slate-800 font-medium">
              <Share2 size={30} color="#6258DC" className="inline-block mr-2" />
              Share Mind Space
            </h1>
            <p className="text-slate-600 text-[12px]">
              Generate a shareable link to share your Mind Space.
            </p>
          </div>
        </div>
        <CopyField />
      </div>
    </BrainModal>
  ) : null;
};
