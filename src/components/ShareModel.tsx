import {
  ModelContainer,
  ModelContentContainer,
  ModelCrossContainer,
} from "../ui/contentModelUI/CreateModel";
import { RxCross2 } from "react-icons/rx";
import type { ModalProps } from "../utils/Globaltypes";
import { Share2 } from "lucide-react";
import CopyField from "./CopyField";
export const ShareModel = (props: ModalProps) => {
  return props.open ? (
    <ModelContainer>
      <ModelContentContainer>
        <div className="flex flex-col justify-between  items-center">
          <div className="flex items-center w-[90%] pt-2">
            <div className="w-[98%] gap-1">
              <h1 className="text-[15px] text-slate-800 font-semibold">
                <Share2 color="#6258DC" className="inline-block mr-2" />
                Share Mind Space
              </h1>
              <p className="text-slate-600 text-[12px]">
                Generate a shareable link to share your Mind Space.
              </p>
            </div>
            <ModelCrossContainer onClose={props.onClose}>
              {<RxCross2 size={20} />}
            </ModelCrossContainer>
          </div>
          <CopyField />
        </div>
      </ModelContentContainer>
    </ModelContainer>
  ) : null;
};
