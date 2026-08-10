import { useSeguimientos } from '../hooks/useSeguimientos';
import type { Seguimiento } from '../api/seguimiento.api';

interface Props {
    tramiteId: number;
}

export function HistorialSeguimiento({ tramiteId }: Props) {
    const { data, isLoading } = useSeguimientos(tramiteId);
    const historial: Seguimiento[] = data?.data ?? [];

    if (isLoading) {
        return <p className="text-sm text-slate-400">Cargando historial...</p>;
    }

    if (historial.length === 0) {
        return <p className="text-sm text-slate-400">Sin movimientos registrados.</p>;
    }

    return (
        <div className="border border-slate-200 rounded-md overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-500 text-xs uppercase tracking-wide">
                        <th className="px-3 py-2 font-medium whitespace-nowrap">Fecha</th>
                        <th className="px-3 py-2 font-medium whitespace-nowrap">De</th>
                        <th className="px-3 py-2 font-medium whitespace-nowrap">A</th>
                        <th className="px-3 py-2 font-medium">Comentario</th>
                        <th className="px-3 py-2 font-medium whitespace-nowrap">Usuario</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {historial.map((s: Seguimiento) => (
                        <tr key={s.id}>
                            <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{new Date(s.createdAt).toLocaleString()}</td>
                            <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{s.estado_anterior ?? '—'}</td>
                            <td className="px-3 py-2 text-slate-700 font-medium whitespace-nowrap">{s.estado_nuevo}</td>
                            <td className="px-3 py-2 text-slate-600">{s.comentario ?? '—'}</td>
                            <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{s.usuario ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}