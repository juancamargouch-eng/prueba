import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cambiarEstadoTramite } from '../api/tramite.api';

interface Payload {
    nuevo_estado: string;
    comentario?: string;
}

export const useCambiarEstadoTramite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: Payload }) => cambiarEstadoTramite(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tramites'] });
        },
    });
};