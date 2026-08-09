import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eliminarTramite } from '../api/tramite.api.js';

export const useEliminarTramite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: eliminarTramite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tramites'] });
        },
    });
};