import { useState } from 'react';
import { useTramites } from '../hooks/useTramites';
import { TramiteModal } from './TramiteModal';
import { CambiarEstadoModal } from './CambiarEstadoModal';
import { EliminarTramiteModal } from './EliminarTramiteModal';
import { DetalleTramiteModal } from './DetalleTramiteModal';
import type { Tramite, EstadoTramite, TramiteFiltros } from '../tramite.types';

const ESTADOS: EstadoTramite[] = ['REGISTRADO', 'EN_FIRMAS', 'PRESENTADO', 'OBSERVADO', 'INSCRITO', 'CERRADO', 'ANULADO'];


const ESTILO_ESTADO: Record<EstadoTramite, string> = {
    REGISTRADO: 'bg-slate-100 text-slate-700 border-slate-200',
    EN_FIRMAS: 'bg-amber-50 text-amber-700 border-amber-200',
    PRESENTADO: 'bg-sky-50 text-sky-700 border-sky-200',
    OBSERVADO: 'bg-red-50 text-red-700 border-red-200',
    INSCRITO: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CERRADO: 'bg-slate-100 text-slate-500 border-slate-200',
    ANULADO: 'bg-red-50 text-red-600 border-red-200',
};


function EstadoBadge({ estado }: { estado: EstadoTramite }) {
    return (
        <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${ESTILO_ESTADO[estado] ?? ''}`}>
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
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold text-slate-800">Bandeja de trámites</h1>
                <button
                    onClick={abrirCrear}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                >
                    Nuevo trámite
                </button>
            </div>

            <div className="flex gap-3 mb-4">
                <select
                    value={filtros.estado}
                    onChange={(e) => cambiarFiltro('estado', e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-700 bg-white"
                >
                    <option value="">Todos los estados</option>
                    {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>

                <input
                    type="text"
                    placeholder="Buscar por código o cliente..."
                    value={filtros.busqueda}
                    onChange={(e) => cambiarFiltro('busqueda', e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 text-sm flex-1 max-w-xs"
                />
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-500 text-xs uppercase tracking-wide">
                            <th className="px-4 py-3 font-medium">Código</th>
                            <th className="px-4 py-3 font-medium">Cliente</th>
                            <th className="px-4 py-3 font-medium">Vehículo</th>
                            <th className="px-4 py-3 font-medium">Estado</th>
                            <th className="px-4 py-3 font-medium">Fecha</th>
                            <th className="px-4 py-3 font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tramites.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                                    No hay trámites registrados.
                                </td>
                            </tr>
                        ) : (
                            tramites.map((tramite) => (
                                <tr key={tramite.id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-700">{tramite.codigo}</td>
                                    <td className="px-4 py-3 text-slate-600">{tramite.cliente?.nombres} {tramite.cliente?.ap_paterno}</td>
                                    <td className="px-4 py-3 text-slate-600">{tramite.marca} {tramite.modelo} ({tramite.anio})</td>
                                    <td className="px-4 py-3"><EstadoBadge estado={tramite.estado} /></td>
                                    <td className="px-4 py-3 text-slate-500">{new Date(tramite.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2 text-xs">
                                            <button onClick={() => setTramiteViendo(tramite)} className="text-slate-600 hover:text-slate-900">Ver</button>
                                            <button onClick={() => abrirEditar(tramite)} className="text-slate-600 hover:text-slate-900">Editar</button>
                                            <button onClick={() => setTramiteCambiandoEstado(tramite)} className="text-slate-600 hover:text-slate-900">Cambiar estado</button>
                                            <button
                                                onClick={() => setTramiteEliminando(tramite)}
                                                disabled={['INSCRITO', 'CERRADO'].includes(tramite.estado)}
                                                className="text-red-500 hover:text-red-700 disabled:text-slate-300 disabled:cursor-not-allowed"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-slate-600">
                <button
                    disabled={meta.page <= 1}
                    onClick={() => cambiarPagina(meta.page - 1)}
                    className="px-3 py-1.5 border border-slate-300 rounded-md disabled:opacity-40"
                >
                    Anterior
                </button>
                <span>Página {meta.page} de {meta.totalPages}</span>
                <button
                    disabled={meta.page >= meta.totalPages}
                    onClick={() => cambiarPagina(meta.page + 1)}
                    className="px-3 py-1.5 border border-slate-300 rounded-md disabled:opacity-40"
                >
                    Siguiente
                </button>
            </div>

            <TramiteModal isOpen={modalAbierto} onClose={cerrarModal} tramiteEditando={tramiteEditando} />
            <CambiarEstadoModal isOpen={Boolean(tramiteCambiandoEstado)} onClose={() => setTramiteCambiandoEstado(null)} tramite={tramiteCambiandoEstado} />
            <EliminarTramiteModal isOpen={Boolean(tramiteEliminando)} onClose={() => setTramiteEliminando(null)} tramite={tramiteEliminando} />
            <DetalleTramiteModal isOpen={Boolean(tramiteViendo)} onClose={() => setTramiteViendo(null)} tramite={tramiteViendo} />
        </div>
    );
}