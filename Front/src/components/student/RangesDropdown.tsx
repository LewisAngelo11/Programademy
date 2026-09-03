import { motion, AnimatePresence } from "motion/react";
import { X } from "@boxicons/react";
import type { UserRange } from "../../pages/student/StudentDashboard";
import "./RangesDropdown.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    range?: UserRange;
    allRanges: UserRange[];
    totalUserPoints: number;
}

export default function RangesDropdown({ isOpen, onClose, range, allRanges, totalUserPoints }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="ranges-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="ranges-dropdown"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        style={{ transformOrigin: "top" }}
                    >
                        <div className="ranges-dropdown-header">
                            <motion.div
                                layoutId="range-trigger"
                                className={`range-student ${range?.titulo}`}
                            >
                                {range ? range.titulo : "Sin rango"}
                            </motion.div>
                            <button className="button-close-dropdown" onClick={onClose}>
                                <X size="sm" />
                            </button>
                        </div>

                        <div className="ranges-dropdown-content">
                            <div className="ranges-dropdown-title">
                                <h3>Rangos</h3>
                                <small>Lista de rangos de los estudiantes</small>
                            </div>

                            {allRanges.map((r, i) => (
                                <motion.article
                                    key={r.id_rango}
                                    className="card-range"
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <div className={`range-student ${r.titulo}`}>
                                        {r.titulo}
                                    </div>
                                    <div className="min-points">
                                        <small className={`color-info-range ${r.titulo}`}>
                                            Puntos mínimos requeridos para este rango
                                        </small>
                                        <small className={`points-info-range ${r.titulo}`}>
                                            {r.puntos_requeridos}
                                        </small>
                                    </div>
                                </motion.article>
                            ))}

                            <hr />

                            <motion.div
                                className="current-range"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3>Rango Actual</h3>
                                <div className={`range-student ${range?.titulo ?? ""}`}>
                                    {range ? range.titulo : "Sin Rango"}
                                </div>
                                <small className={`color-info-range ${range?.titulo ?? ""}`}>
                                    Puntos Totales:{" "}
                                    <span style={{ fontWeight: 600, fontSize: ".9rem" }}>
                                        {totalUserPoints}
                                    </span>
                                </small>
                            </motion.div>

                            <div className="modal-footer">
                                <small>
                                    Los puntos se obtienen al completar un quiz con el 100%.
                                </small>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
