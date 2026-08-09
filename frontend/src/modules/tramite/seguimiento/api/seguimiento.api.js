import httpClient from '../../../../shared/api/httpClient.js';

export const obtenerSeguimientos = async (tramiteId) => {
    const { data } = await httpClient.get(`/tramites/${tramiteId}/seguimientos`);
    return data;
};