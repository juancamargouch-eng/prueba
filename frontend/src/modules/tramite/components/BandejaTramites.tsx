import { useState } from 'react';
import { useTramites } from '../hooks/useTramites';
import { TramiteModal } from './TramiteModal';
import { CambiarEstadoModal } from './CambiarEstadoModal';
import { EliminarTramiteModal } from './EliminarTramiteModal';
import { DetalleTramiteModal } from './DetalleTramiteModal';
import type { Tramite, EstadoTramite, TramiteFiltros } from '../tramite.types';

const ESTADOS: EstadoTramite[] = ['REGISTRADO', 'EN_FIRMAS', 'PRESENTADO', 'OBSERVADO', 'INSCRITO', 'CERRADO', 'ANULADO'];


const COLOR_ESTADO: Record<EstadoTramite, string> = {
    REGISTRADO: '#94a3b8', EN_FIRMAS: '#f59e0b', PRESENTADO: '#3b82f6',
    OBSERVADO: '#ef4444', INSCRITO: '#10b981', CERRADO: '#64748b', ANULADO: '#dc2626',
};

function EstadoBadge({ estado }: { estado: EstadoTramite }) {
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
    const [filtros, setFiltros] = useState<TramiteFiltros>({ estado: '', busqueda: '', page: 1, pageSize: 10 });
    const [modalAbierto, setModalAbierto] = useState(false);
    const [tramiteEditando, setTramiteEditando] = useState<Tramite | null>(null);
    const [tramiteCambiandoEstado, setTramiteCambiandoEstado] = useState<Tramite | null>(null);
    const [tramiteEliminando, setTramiteEliminando] = useState<Tramite | null>(null);
    const [tramiteViendo, setTramiteViendo] = useState<Tramite | null>(null);


    const abrirCrear = () => { setTramiteEditando(null); setModalAbierto(true); };
    const abrirEditar = (tramite: Tramite) => { setTramiteEditando(tramite); setModalAbierto(true); };
    const cerrarModal = () => { setModalAbierto(false); setTramiteEditando(null); };

    const { data, isLoading, isError, error } = useTramites({
        estado: filtros.estado || undefined,
        busqueda: filtros.busqueda || undefined,
        page: filtros.page,
        pageSize: filtros.pageSize,
    });

    const cambiarFiltro = (campo: keyof TramiteFiltros, valor: string) => {
        setFiltros((prev) => ({ ...prev, [campo]: valor, page: 1 }));
    };

    const cambiarPagina = (page: number) => {
        setFiltros((prev) => ({ ...prev, page }));
    };

    if (isLoading) return <p>Cargando trámites...</p>;
    if (isError) {
        const err = error as { response?: { data?: { mensaje?: string } }; message?: string };
        return <p>Error al cargar los trámites: {err?.response?.data?.mensaje ?? err?.message}</p>;
    }

    const tramites: Tramite[] = data?.data ?? [];
    const meta = data?.meta ?? { page: 1, totalPages: 1, total: 0, pageSize: 10 };

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

                <button onClick={abrirCrear}>Nuevo trámite</button>
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
                                <td>
                                    <button onClick={() => abrirEditar(tramite)}>Editar</button>
                                    {' '}
                                    <button onClick={() => setTramiteCambiandoEstado(tramite)}>Cambiar estado</button>
                                    {' '}
                                    <button onClick={() => setTramiteEliminando(tramite)} disabled={['INSCRITO', 'CERRADO'].includes(tramite.estado)}>Eliminar</button>
                                    {' '}
                                    <button onClick={() => setTramiteViendo(tramite)}>Ver</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <TramiteModal
                isOpen={modalAbierto}
                onClose={cerrarModal}
                tramiteEditando={tramiteEditando}
            />

            <CambiarEstadoModal
                isOpen={Boolean(tramiteCambiandoEstado)}
                onClose={() => setTramiteCambiandoEstado(null)}
                tramite={tramiteCambiandoEstado}
            />

            <EliminarTramiteModal
                isOpen={Boolean(tramiteEliminando)}
                onClose={() => setTramiteEliminando(null)}
                tramite={tramiteEliminando}
            />
            <DetalleTramiteModal
                isOpen={Boolean(tramiteViendo)}
                onClose={() => setTramiteViendo(null)}
                tramite={tramiteViendo}
            />

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button disabled={meta.page <= 1} onClick={() => cambiarPagina(meta.page - 1)}>Anterior</button>
                <span>Página {meta.page} de {meta.totalPages}</span>
                <button disabled={meta.page >= meta.totalPages} onClick={() => cambiarPagina(meta.page + 1)}>Siguiente</button>
            </div>
        </div>
    );
}