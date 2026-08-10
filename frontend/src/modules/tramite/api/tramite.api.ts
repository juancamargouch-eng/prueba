import httpClient from '../../../shared/api/httpClient';
import type { ApiResponse } from '../../../shared/types/api';
import type { Tramite, TramiteFiltros } from '../tramite.types';

export const listarTramites = async (params: TramiteFiltros): Promise<ApiResponse<Tramite[]>> => {
    const { data } = await httpClient.get('/tramites', { params });
    return data; // { ok, data, meta }
};

export const obtenerTramite = async (id: number): Promise<ApiResponse<Tramite>> => {
    const { data } = await httpClient.get(`/tramites/${id}`);
    return data;
};

export const crearTramite = async (payload: unknown): Promise<ApiResponse<Tramite>> => {
    const { data } = await httpClient.post('/tramites', payload);
    return data;
};

export const actualizarTramite = async (id: number, payload: unknown): Promise<ApiResponse<Tramite>> => {
    const { data } = await httpClient.put(`/tramites/${id}`, payload);
    return data;
};

export const cambiarEstadoTramite = async (id: number, payload: unknown): Promise<ApiResponse<Tramite>> => {
    const { data } = await httpClient.patch(`/tramites/${id}/estado`, payload);
    return data;
};

export const eliminarTramite = async (id: number): Promise<ApiResponse<{ eliminado: boolean }>> => {
    const { data } = await httpClient.delete(`/tramites/${id}`);
    return data;
};