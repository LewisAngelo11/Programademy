import type React from "react";
import type { ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { X } from "@boxicons/react";
import "./Modal.css"

interface ModalProps {
    children: ReactNode;
    setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ children, setOpenModal }: ModalProps) {
    return createPortal(
        <div className="overlay" onClick={() => setOpenModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="button-close-modal" onClick={() => setOpenModal(false)}><X/></button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")!
    )
}