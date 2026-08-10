import { useState } from 'react';
import { Modal } from '../../../shared/components/Modal';
import { useCambiarEstadoTramite } from '../hooks/useCambiarEstadoTramite';
import { TRANSICIONES } from '../../../shared/constants/estados';
import type { Tramite, EstadoTramite } from '../tramite.types';
import type { AxiosLikeError } from '../../../shared/types/modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    tramite: Tramite | null;
}

export function CambiarEstadoModal({ isOpen, onClose, tramite }: Props) {
    const [nuevoEstado, setNuevoEstado] = useState<EstadoTramite | ''>('');
    const [comentario, setComentario] = useState('');
    const mutation = useCambiarEstadoTramite();

    const opciones = tramite ? (TRANSICIONES[tramite.estado] ?? []) : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!tramite) return;
        mutation.mutate(
            { id: tramite.id, payload: { nuevo_estado: nuevoEstado, comentario } },
            {
                onSuccess: () => {
                    setNuevoEstado('');
                    setComentario('');
                    onClose();
                },
            }
        );
    };

    if (!tramite) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Cambiar estado — ${tramite.codigo}`}>
            <p className="text-sm text-slate-600 mb-2">Estado actual: <strong>{tramite.estado}</strong></p>

            {opciones.length === 0 ? (
                <p className="text-sm text-slate-600 mb-2">Este trámite está en un estado final, no admite cambios.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400" value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value as EstadoTramite)} required>
                        <option value="">-- Selecciona el nuevo estado --</option>
                        {opciones.map((estado: EstadoTramite) => (
                            <option key={estado} value={estado}>{estado}</option>
                        ))}
                    </select>

                    <textarea
                        placeholder="Comentario (opcional)"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />

                    <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md disabled:opacity-50" type="submit" disabled={mutation.isPending || !nuevoEstado}>
                        {mutation.isPending ? 'Guardando...' : 'Confirmar cambio'}
                    </button>

                    {mutation.isError && (
                        <p className="text-xs text-red-600 mb-2">
                            {(mutation.error as AxiosLikeError)?.response?.data?.mensaje ?? 'Error al cambiar el estado'}
                        </p>
                    )}
                </form>
            )}
        </Modal>
    );
}