import { type ReactNode } from "react" ;



export type ChildrenType = {
    children: ReactNode;
};

//
export interface ModalProps {
    open: boolean;
    onClose: (open: boolean) => void;
    refreshContent?: () => void
}
