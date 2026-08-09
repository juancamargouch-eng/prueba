import { Modal } from '../../../shared/components/Modal.jsx';
import { TramiteForm } from './TramiteForm.jsx';
import { useCrearTramite } from '../hooks/useCrearTramite.js';
import { useActualizarTramite } from '../hooks/useActualizarTramite.js';

export function TramiteModal({ isOpen, onClose, tramiteEditando }) {
    const esEdicion = Boolean(tramiteEditando);

    const crearMutation = useCrearTramite();
    const actualizarMutation = useActualizarTramite();

    const mutacionActiva = esEdicion ? actualizarMutation : crearMutation;

    const handleSubmit = (datos) => {
        if (esEdicion) {
            actualizarMutation.mutate(
                { id: tramiteEditando.id, payload: datos },
                { onSuccess: onClose }
            );
        } else {
            crearMutation.mutate(datos, { onSuccess: onClose });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={esEdicion ? 'Editar trámite' : 'Nuevo trámite'}
        >
            <TramiteForm
                tramiteInicial={tramiteEditando}
                onSubmit={handleSubmit}
                isSubmitting={mutacionActiva.isPending}
            />
            {mutacionActiva.isError && (
                <p style={{ color: 'red' }}>
                    {mutacionActiva.error?.response?.data?.mensaje ?? 'Ocurrió un error al guardar'}
                </p>
            )}
        </Modal>
    );
}