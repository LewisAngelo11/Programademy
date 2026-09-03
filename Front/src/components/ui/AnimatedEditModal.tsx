import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { X } from "@boxicons/react";
import type { ReactNode } from "react";
import "./AnimatedEditModal.css";

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    layoutId: string;
    title: string;
    trigger: ReactNode;
    children: ReactNode;
}

export default function AnimatedEditModal({
    isOpen,
    onOpen,
    onClose,
    layoutId,
    title,
    trigger,
    children,
}: Props) {
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleChange = () => {
            setIsMobile(mediaQuery.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return (
        <div className="edit-modal-wrapper">
            <motion.button
                layoutId={layoutId}
                onClick={onOpen}
                className="button-edit-info"
                title="Editar información"
            >
                {trigger}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="edit-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                        />
                        <motion.div
                            className="edit-dropdown"
                            initial={
                                isMobile ? { opacity: 0, scaleY: 0 } : { opacity: 0, scaleY: 0, scaleX: 0 }
                            }
                            animate={
                                isMobile ? { opacity: 1, scaleY: 1 } : { opacity: 1, scaleY: 1, scaleX: 1 }
                            }
                            exit={
                                isMobile ? { opacity: 0, scaleY: 0 } : { opacity: 0, scaleY: 0, scaleX: 0 }
                            }
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={ isMobile ? { transformOrigin: "top" } : { transformOrigin: "top left" }} 
                        >
                            <div className="edit-dropdown-header">
                                <motion.div
                                    layoutId={layoutId}
                                    className="edit-trigger-copy"
                                >
                                    {trigger}
                                </motion.div>
                                <button className="button-close-dropdown" onClick={onClose}>
                                    <X size="sm" />
                                </button>
                            </div>
                            <div className="edit-dropdown-body">
                                <h3>{title}</h3>
                                {children}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
