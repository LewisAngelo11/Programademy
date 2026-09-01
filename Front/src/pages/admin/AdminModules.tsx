import HeaderAdminPages from "../../components/admin/HeaderAdminPages";
import { Plus, Pencil, Trash, Search } from "@boxicons/react";
import { useEffect, useState } from "react";
import "./AdminModules.css";
import { useNavigate } from "react-router";
import { ModuloService } from "../../services/moduleService";
import Skeleton from "../../components/ui/Skeleton";

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

    // Función para manejar la eliminación
    const handleModuloDeleted = (idModulo: number) => {
        // Remover el módulo de la lista local sin necesidad de recargar todo
        setModulos(previusModulos => 
            previusModulos.filter(m => m.id_modulo !== idModulo)
        );
    };

    const getAllModules = async () => {
        try {
            setLoading(true);
            const response = await ModuloService.getAllModules();

            setModulos(response);
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
                        Array.from({ length: 16 }).map((_, index) => (
                            <ModuleSkeleton key={index} />
                        ))
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
                            onDelete={handleModuloDeleted}
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
    descripcion: string;
    orden: number;
    curso: {
        id_curso: number;
        titulo: string;
    };
    onDelete?: (id: number) => void; // Callback opcional
}

function Module({ id_modulo, titulo, descripcion, orden, curso, onDelete }: ModulesProp) {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        // Confirmar antes de eliminar
        const confirmacion = window.confirm(
            `¿Estás seguro de que deseas eliminar el módulo "${titulo}"?`
        );

        if (!confirmacion) return;
        setIsDeleting(true);

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            throw new Error("No hay token de autenticación");
        }

        try {
            await ModuloService.deleteModulo(id_modulo);

            // Notificar éxito
            alert('Módulo eliminado exitosamente');
            
            // Llamar al callback para actualizar la lista en el componente padre
            if (onDelete) {
                onDelete(id_modulo);
            }
            
        } catch (error) {
            console.error('Error al eliminar módulo:', error);
            alert(error instanceof Error ? error.message : 'Error al    eliminar el módulo');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <article className="module-container fade-in-skeleton">
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
                <button 
                    className="delete-btn"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    <Trash fill="#ff3b30" size="xs"/>
                </button>
            </div>
        </article>
    );
}

function ModuleSkeleton() {
    return (
        <article className="module-container">
            <div className="secundary-module-info">
                <Skeleton width={70} height={24} borderRadius={8} />
                <Skeleton width={90} height={24} borderRadius={8} />
            </div>
            <div className="primary-module-info">
                <Skeleton width="60%" height={20} borderRadius={4} />
                <Skeleton width="90%" height={14} borderRadius={4} style={{ marginTop: "0.5rem" }} />
            </div>
            <div className="buttons-actions-module">
                <Skeleton className="edit-btn" height={40} borderRadius={8} />
                <Skeleton width={48} height={40} borderRadius={8} />
            </div>
        </article>
    );
}