import { Modal } from '../../../shared/components/Modal';
import { useEliminarTramite } from '../hooks/useEliminarTramite';
import type { Tramite } from '../tramite.types';
import type { AxiosLikeError } from '../../../shared/types/modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    tramite: Tramite | null;
}

export function EliminarTramiteModal({ isOpen, onClose, tramite }: Props) {
    const mutation = useEliminarTramite();

    if (!tramite) return null;

    const handleConfirmar = () => {
        mutation.mutate(tramite.id, { onSuccess: onClose });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirmar eliminación">
            <p>
                ¿Seguro que deseas eliminar el trámite <strong>{tramite.codigo}</strong>
                {' '}({tramite.marca} {tramite.modelo})? Esta acción no se puede deshacer,
                y se borrará también todo su historial de seguimiento.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button onClick={onClose} disabled={mutation.isPending}>Cancelar</button>
                <button onClick={handleConfirmar} disabled={mutation.isPending} style={{ backgroundColor: '#dc2626', color: 'white' }}>
                    {mutation.isPending ? 'Eliminando...' : 'Eliminar'}
                </button>
            </div>

            {mutation.isError && (
                <p style={{ color: 'red' }}>
                    {(mutation.error as AxiosLikeError)?.response?.data?.mensaje ?? 'Error al eliminar el trámite'}
                </p>
            )}
        </Modal>
    );
}