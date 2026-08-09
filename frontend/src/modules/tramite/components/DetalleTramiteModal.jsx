// frontend/src/modules/tramite/components/DetalleTramiteModal.jsx
import { Modal } from '../../../shared/components/Modal.jsx';
import { HistorialSeguimiento } from '../seguimiento/components/HistorialSeguimiento.jsx';

export function DetalleTramiteModal({ isOpen, onClose, tramite }) {
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
            <HistorialSeguimiento tramiteId={tramite.id} />
        </Modal>
    );
}