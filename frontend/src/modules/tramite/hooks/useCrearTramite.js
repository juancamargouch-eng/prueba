import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearTramite } from '../api/tramite.api.js';

export const useCrearTramite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: crearTramite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tramites'] });
        },
    });
};