import type { UserRange } from "../../pages/student/StudentDashboard";
import "./ModalRangos.css";

interface RangesProp {
    range?: UserRange;
    allRanges: UserRange[];
    totalUserPoints: number;
}

export default function ModalRangos({ range, allRanges, totalUserPoints }: RangesProp) {
    return (
        <div className="ranges-modal">
            <header>
                <h2>Rangos</h2>
                <small>Lista de rangos de los estudiantes</small>
            </header>
            {allRanges.map(r => (
                <article className="card-range">
                    <div
                        key={r.id_rango}
                        className={`range-student ${r.titulo}`}
                    >
                        {r.titulo}
                    </div>
                    <div className="min-points">
                        <small className={`color-info-range ${r.titulo}`}>Puntos mínimos requeridos para este rango</small>
                        <small className={`points-info-range ${r.titulo}`}>{r.puntos_requeridos}</small>
                    </div>
                </article>
            ))}
            <hr style={{ width: "100%" }}/>  
            <div className="current-range">
                <h2>Rango Actual</h2>
                <div
                    className={`range-student ${range ? range.titulo : ""}`}
                >
                    {range ? range.titulo : "Sin Rango"}
                </div>
                <small className={`color-info-range ${range ? range.titulo : ""}`}>Puntos Totales: <span style={{ fontWeight: "600", fontSize: ".9rem" }}>{totalUserPoints}</span></small>
            </div>
            <div className="modal-footer">
                <small>
                    Los puntos se obtienen al completar un quiz con el 100%.
                </small>
            </div>
        </div>
    )
}