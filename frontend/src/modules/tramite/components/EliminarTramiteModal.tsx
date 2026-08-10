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
            <p className="text-sm text-slate-600 mb-2">
                ¿Seguro que deseas eliminar el trámite <strong>{tramite.codigo}</strong>
                {' '}({tramite.marca} {tramite.modelo})? Esta acción no se puede deshacer,
                y se borrará también todo su historial de seguimiento.
            </p>

            <div className="flex gap-2 justify-end">
                <button
                    onClick={onClose}
                    disabled={mutation.isPending}
                    className="border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2 rounded-md hover:bg-slate-50 disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleConfirmar}
                    disabled={mutation.isPending}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50"
                >
                    {mutation.isPending ? 'Eliminando...' : 'Eliminar'}
                </button>
            </div>

            {mutation.isError && (
                <p className="text-xs text-red-600 mb-2">
                    {(mutation.error as AxiosLikeError)?.response?.data?.mensaje ?? 'Error al eliminar el trámite'}
                </p>
            )}
        </Modal>
    );
}