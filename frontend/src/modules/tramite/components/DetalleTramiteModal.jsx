import { Modal } from '../../../shared/components/Modal.jsx';
import { useSeguimientos } from '../seguimiento/hooks/useSeguimientos.js';

export function DetalleTramiteModal({ isOpen, onClose, tramite }) {
    const { data, isLoading } = useSeguimientos(tramite?.id);
    const historial = data?.data ?? [];

    if (!tramite) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Detalle — ${tramite.codigo}`}>
            <h3>Datos del trámite</h3>
            <p>Vehículo: {tramite.marca} {tramite.modelo} ({tramite.anio}) — Placa: {tramite.placa ?? 'N/A'}</p>
            <p>Estado actual: {tramite.estado}</p>
            <p>Monto: {tramite.monto ?? 'N/A'}</p>

            <h3>Cliente</h3>
            <p>{tramite.cliente?.nombres} {tramite.cliente?.ap_paterno} {tramite.cliente?.ap_materno}</p>
            <p>{tramite.cliente?.tipo_doc}: {tramite.cliente?.num_doc}</p>
            <p>Email: {tramite.cliente?.email ?? 'N/A'} — Tel: {tramite.cliente?.telefono ?? 'N/A'}</p>

            <h3>Historial de seguimiento</h3>
            {isLoading ? (
                <p>Cargando historial...</p>
            ) : (
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
            )}
        </Modal>
    );
}