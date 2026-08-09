import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cambiarEstadoTramite } from '../api/tramite.api.js';

export const useCambiarEstadoTramite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => cambiarEstadoTramite(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tramites'] });
        },
    });
};