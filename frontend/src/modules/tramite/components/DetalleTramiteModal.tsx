import { Modal } from '../../../shared/components/Modal';
import { HistorialSeguimiento } from '../seguimiento/components/HistorialSeguimiento';
import type { Tramite } from '../tramite.types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    tramite: Tramite | null;
}

function Dato({ label, valor }: { label: string; valor: string | number | null | undefined }) {
    return (
        <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
            <p className="text-sm text-slate-700">{valor ?? 'N/A'}</p>
        </div>
    );
}

export function DetalleTramiteModal({ isOpen, onClose, tramite }: Props) {
    if (!tramite) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Detalle — ${tramite.codigo}`} size="lg">
            <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Datos del trámite</h3>
                <div className="grid grid-cols-2 gap-4 border border-slate-200 rounded-md p-4">
                    <Dato label="Vehículo" valor={`${tramite.marca} ${tramite.modelo} (${tramite.anio})`} />
                    <Dato label="Placa" valor={tramite.placa} />
                    <Dato label="Estado actual" valor={tramite.estado} />
                    <Dato label="Monto" valor={tramite.monto} />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Cliente</h3>
                <div className="grid grid-cols-2 gap-4 border border-slate-200 rounded-md p-4">
                    <Dato
                        label="Nombre"
                        valor={`${tramite.cliente?.nombres ?? ''} ${tramite.cliente?.ap_paterno ?? ''} ${tramite.cliente?.ap_materno ?? ''}`}
                    />
                    <Dato label="Documento" valor={`${tramite.cliente?.tipo_doc}: ${tramite.cliente?.num_doc}`} />
                    <Dato label="Email" valor={tramite.cliente?.email} />
                    <Dato label="Teléfono" valor={tramite.cliente?.telefono} />
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">Historial de seguimiento</h3>
                <HistorialSeguimiento tramiteId={tramite.id} />
            </div>
        </Modal>
    );
}