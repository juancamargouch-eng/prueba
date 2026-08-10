import { useQuery } from '@tanstack/react-query';
import { listarTramites } from '../api/tramite.api';
import type { TramiteFiltros } from '../tramite.types';

export const useTramites = (params: TramiteFiltros) => {
    return useQuery({
        queryKey: ['tramites', params],
        queryFn: () => listarTramites(params),
    });
};