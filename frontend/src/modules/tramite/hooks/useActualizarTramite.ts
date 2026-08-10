import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actualizarTramite } from '../api/tramite.api';

interface Payload {
    nuevo_estado: string;
    comentario?: string;
}

export const useActualizarTramite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: unknown }) => actualizarTramite(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tramites'] });
        },
    });
};