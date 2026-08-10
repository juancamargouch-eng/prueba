import { Modal } from '../../../shared/components/Modal';
import { TramiteForm } from './TramiteForm';
import { useCrearTramite } from '../hooks/useCrearTramite';
import { useActualizarTramite } from '../hooks/useActualizarTramite';
import type { Tramite } from '../tramite.types';
import { AxiosLikeError } from '../../../shared/types/modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    tramiteEditando: Tramite | null;
}

export function TramiteModal({ isOpen, onClose, tramiteEditando }: Props) {
    const esEdicion = Boolean(tramiteEditando);

    const crearMutation = useCrearTramite();
    const actualizarMutation = useActualizarTramite();

    const mutacionActiva = esEdicion ? actualizarMutation : crearMutation;

    const handleSubmit = (datos: unknown) => {
        if (esEdicion && tramiteEditando) {
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
                    {(mutacionActiva.error as AxiosLikeError)?.response?.data?.mensaje ?? 'Ocurrió un error al guardar'}
                </p>
            )}
        </Modal>
    );
}