import httpClient from '../../../../shared/api/httpClient';
import type { ApiResponse } from '../../../../shared/types/api';

export interface Seguimiento {
    id: number;
    tramite_id: number;
    estado_anterior: string | null;
    estado_nuevo: string;
    comentario: string | null;
    usuario: string | null;
    createdAt: string;
}

export const obtenerSeguimientos = async (tramiteId: number): Promise<ApiResponse<Seguimiento[]>> => {
    const { data } = await httpClient.get(`/tramites/${tramiteId}/seguimientos`);
    return data;
};