import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actualizarTramite } from '../api/tramite.api.js';

export const useActualizarTramite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => actualizarTramite(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tramites'] });
        },
    });
};