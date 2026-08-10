import { useQuery } from '@tanstack/react-query';
import { obtenerSeguimientos } from '../api/seguimiento.api';

export const useSeguimientos = (tramiteId: number) => {
    return useQuery({
        queryKey: ['seguimientos', tramiteId],
        queryFn: () => obtenerSeguimientos(tramiteId),
        enabled: Boolean(tramiteId),
    });
};