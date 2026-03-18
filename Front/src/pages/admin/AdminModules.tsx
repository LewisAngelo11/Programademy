import HeaderAdminPages from "../../components/admin/HeaderAdminPages";
import { Plus, Pencil, Trash, Search } from "@boxicons/react";
import { useEffect, useState } from "react";
import "./AdminModules.css";
import { useNavigate } from "react-router";

interface Modulo {
    id_modulo: number;
    titulo: string;
    descripcion: string;
    contenido_teorico: string | null;
    orden: number;
    id_curso: number;
    curso: {
        id_curso: number;
        titulo: string;
    };
}


export default function AdminModules() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filteredModulos = modulos.filter(m => 
        m.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getAllModules = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token'); // O donde guardes tu token
            
            const response = await fetch('http://localhost:3000/modulo/all', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar los módulos');
            }

            const data = await response.json();
            setModulos(data);
        } catch (err) {
            setError('No se pudieron consultar los módulos');
            console.error('Error al consultar los modulos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllModules();
    }, []);

    return (
        <main className="admin-modules-page">
            <HeaderAdminPages/>
            <section className="admin-modules-section">
                <header className="header-modules-sections">
                    <div>
                        <h1>Gestión de Módulos</h1>
                        <small>Administra el contenido teórico de los cursos educativos</small>
                    </div>
                    <button
                        className="add-new-module"
                        onClick={() => navigate("/modules/create")}>
                        <Plus size="xs"/>
                        Nuevo Módulo
                    </button>
                </header>
                <div className="search-container">
                    <Search size="sm" className="search-icon"/>
                    <input 
                        type="text"
                        placeholder="Buscar módulos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="modules-grid">
                    {loading && (
                        <div className="empty-state">Cargando módulos...</div>
                    )}

                    {error && (
                        <div className="empty-state error">{error}</div>
                    )}

                    {!loading && !error && filteredModulos.length === 0 && modulos.length > 0 && (
                        <div className="empty-state">No se encontraron módulos</div>
                    )}

                    {filteredModulos.length > 0 && (modulos.map(m => (
                        <Module 
                            key={m.id_modulo}
                            id_modulo={m.id_modulo}
                            titulo={m.titulo}
                            descripcion={m.descripcion}
                            orden={m.orden}
                            curso={m.curso}
                            />
                    )))}
                </div>
            </section>
        </main>
    );
}

interface ModulesProp {
    id_modulo: number;
    titulo: string;
    descripcion: string | null;
    orden: number;
    curso: {
        id_curso: number;
        titulo: string;
    };
}

function Module({ id_modulo, titulo, descripcion, orden, curso }: ModulesProp) {
    const navigate = useNavigate();
    return (
        <article className="module-container">
            <div className="secundary-module-info">
                <span className="orden-modulo">Módulo {orden}</span>
                <span className="curso-modulo">{curso.titulo}</span>
            </div>
            <div className="primary-module-info">
                <h2>{titulo}</h2>
                <small>{descripcion}</small>
            </div>
            <div className="buttons-actions-module">
                <button
                    className="edit-btn"
                    onClick={() => navigate(`/modules/edit/${id_modulo}`)}
                >
                    <Pencil size="xs"/>
                    Editar
                </button>
                <button className="delete-btn">
                    <Trash fill="#ff3b30" size="xs"/>
                </button>
            </div>
        </article>
    );
}