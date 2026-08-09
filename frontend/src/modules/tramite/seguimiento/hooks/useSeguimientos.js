import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../../shared/api/httpClient.js';

const obtenerSeguimientos = async (tramiteId) => {
    const { data } = await httpClient.get(`/tramites/${tramiteId}/seguimientos`);
    return data;
};

export const useSeguimientos = (tramiteId) => {
    return useQuery({
        queryKey: ['seguimientos', tramiteId],
        queryFn: () => obtenerSeguimientos(tramiteId),
        enabled: Boolean(tramiteId),
    });
};