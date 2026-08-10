import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearTramite } from '../api/tramite.api';

export const useCrearTramite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: unknown) => crearTramite(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tramites'] });
        },
    });
};