import { useQuery } from '@tanstack/react-query';
import { listarTramites } from '../api/tramite.api.js';

export const useTramites = (params) => {
    return useQuery({
        queryKey: ['tramites', params],
        queryFn: () => listarTramites(params),
    });
};