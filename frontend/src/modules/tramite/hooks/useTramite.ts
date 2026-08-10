import { useQuery } from '@tanstack/react-query';
import { obtenerTramite } from '../api/tramite.api';

export const useTramite = (id: number | null) => {
    return useQuery({
        queryKey: ['tramites', id],
        queryFn: () => obtenerTramite(id as number),
        enabled: Boolean(id),
    });
};