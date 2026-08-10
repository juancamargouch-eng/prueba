import { useSeguimientos } from '../hooks/useSeguimientos';
import type { Seguimiento } from '../api/seguimiento.api';

interface Props {
    tramiteId: number;
}

export function HistorialSeguimiento({ tramiteId }: Props) {
    const { data, isLoading } = useSeguimientos(tramiteId);
    const historial: Seguimiento[] = data?.data ?? [];

    if (isLoading) return <p>Cargando historial...</p>;

    return (
        <table>
            <thead>
                <tr><th>Fecha</th><th>De</th><th>A</th><th>Comentario</th><th>Usuario</th></tr>
            </thead>
            <tbody>
                {historial.map((s: Seguimiento) => (
                    <tr key={s.id}>
                        <td>{new Date(s.createdAt).toLocaleString()}</td>
                        <td>{s.estado_anterior ?? '—'}</td>
                        <td>{s.estado_nuevo}</td>
                        <td>{s.comentario ?? '—'}</td>
                        <td>{s.usuario ?? '—'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}