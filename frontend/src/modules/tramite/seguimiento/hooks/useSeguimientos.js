import { useQuery } from '@tanstack/react-query';
import { obtenerSeguimientos } from '../api/seguimiento.api.js';

export const useSeguimientos = (tramiteId) => {
    return useQuery({
        queryKey: ['seguimientos', tramiteId],
        queryFn: () => obtenerSeguimientos(tramiteId),
        enabled: Boolean(tramiteId),
    });
};