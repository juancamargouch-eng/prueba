import { useSeguimientos } from '../hooks/useSeguimientos.js';

export function HistorialSeguimiento({ tramiteId }) {
    const { data, isLoading } = useSeguimientos(tramiteId);
    const historial = data?.data ?? [];

    if (isLoading) return <p>Cargando historial...</p>;

    return (
        <table>
            <thead>
                <tr><th>Fecha</th><th>De</th><th>A</th><th>Comentario</th><th>Usuario</th></tr>
            </thead>
            <tbody>
                {historial.map((s) => (
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