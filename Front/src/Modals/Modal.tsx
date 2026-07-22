import React, { useState } from "react";
import type { ReactNode, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { X } from "@boxicons/react";
import "./Modal.css"

interface ModalProps {
    children: ReactNode;
    setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ children, setOpenModal }: ModalProps) {
    const [isClose, setIsClose] = useState(false);

    const closeModal = () => {
        setIsClose(true);
    };

    const handleAnimationEnd = () => {
        if (isClose) {
            setOpenModal(false);
        }
    };

    return createPortal(
        <div
            className={`overlay ${isClose ? "closing" : "opening"}`}
            onClick={closeModal}
            onAnimationEnd={handleAnimationEnd}
        >
            <div className={`modal ${isClose ? "closing" : "opening"}`} onClick={(e) => e.stopPropagation()}>
                <button className="button-close-modal" onClick={closeModal}><X /></button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")!
    )
}