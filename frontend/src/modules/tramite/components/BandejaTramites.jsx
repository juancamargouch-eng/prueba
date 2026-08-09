import { useState } from 'react';
import { useTramites } from '../hooks/useTramites.js';

const ESTADOS = ['REGISTRADO', 'EN_FIRMAS', 'PRESENTADO', 'OBSERVADO', 'INSCRITO', 'CERRADO', 'ANULADO'];

const COLOR_ESTADO = {
    REGISTRADO: '#94a3b8',
    EN_FIRMAS: '#f59e0b',
    PRESENTADO: '#3b82f6',
    OBSERVADO: '#ef4444',
    INSCRITO: '#10b981',
    CERRADO: '#64748b',
    ANULADO: '#dc2626',
};

function EstadoBadge({ estado }) {
    return (
        <span style={{
            backgroundColor: COLOR_ESTADO[estado] ?? '#94a3b8',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
        }}>
            {estado}
        </span>
    );
}

export function BandejaTramites() {
    const [filtros, setFiltros] = useState({ estado: '', busqueda: '', page: 1, pageSize: 10 });

    const { data, isLoading, isError, error } = useTramites({
        estado: filtros.estado || undefined,
        busqueda: filtros.busqueda || undefined,
        page: filtros.page,
        pageSize: filtros.pageSize,
    });

    const cambiarFiltro = (campo, valor) => {
        setFiltros((prev) => ({ ...prev, [campo]: valor, page: 1 })); // resetea a página 1 al filtrar
    };

    const cambiarPagina = (page) => {
        setFiltros((prev) => ({ ...prev, page }));
    };

    if (isLoading) return <p>Cargando trámites...</p>;
    if (isError) return <p>Error al cargar los trámites: {error?.response?.data?.mensaje ?? error?.message}</p>;

    const tramites = data?.data ?? [];
    const meta = data?.meta ?? { page: 1, totalPages: 1, total: 0 };

    return (
        <div>
            <h1>Bandeja de trámites</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <select value={filtros.estado} onChange={(e) => cambiarFiltro('estado', e.target.value)}>
                    <option value="">Todos los estados</option>
                    {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>

                <input
                    type="text"
                    placeholder="Buscar por código o cliente..."
                    value={filtros.busqueda}
                    onChange={(e) => cambiarFiltro('busqueda', e.target.value)}
                />

                <button>Nuevo trámite</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Código</th><th>Cliente</th><th>Vehículo</th><th>Estado</th><th>Fecha</th><th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tramites.length === 0 ? (
                        <tr><td colSpan={6}>No hay trámites registrados.</td></tr>
                    ) : (
                        tramites.map((tramite) => (
                            <tr key={tramite.id}>
                                <td>{tramite.codigo}</td>
                                <td>{tramite.cliente?.nombres} {tramite.cliente?.ap_paterno}</td>
                                <td>{tramite.marca} {tramite.modelo} ({tramite.anio})</td>
                                <td><EstadoBadge estado={tramite.estado} /></td>
                                <td>{new Date(tramite.createdAt).toLocaleDateString()}</td>
                                <td>Ver / Editar / Cambiar estado / Eliminar</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button disabled={meta.page <= 1} onClick={() => cambiarPagina(meta.page - 1)}>Anterior</button>
                <span>Página {meta.page} de {meta.totalPages}</span>
                <button disabled={meta.page >= meta.totalPages} onClick={() => cambiarPagina(meta.page + 1)}>Siguiente</button>
            </div>
        </div>
    );
}