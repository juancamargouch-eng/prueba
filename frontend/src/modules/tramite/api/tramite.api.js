import httpClient from '../../../shared/api/httpClient.js';

export const listarTramites = async (params) => {
    const { data } = await httpClient.get('/tramites', { params });
    return data; // { ok, data, meta }
};

export const obtenerTramite = async (id) => {
    const { data } = await httpClient.get(`/tramites/${id}`);
    return data;
};

export const crearTramite = async (payload) => {
    const { data } = await httpClient.post('/tramites', payload);
    return data;
};

export const actualizarTramite = async (id, payload) => {
    const { data } = await httpClient.put(`/tramites/${id}`, payload);
    return data;
};

export const cambiarEstadoTramite = async (id, payload) => {
    const { data } = await httpClient.patch(`/tramites/${id}/estado`, payload);
    return data;
};

export const eliminarTramite = async (id) => {
    const { data } = await httpClient.delete(`/tramites/${id}`);
    return data;
};