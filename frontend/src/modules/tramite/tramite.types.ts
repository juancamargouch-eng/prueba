import type { Cliente } from '../cliente/cliente.types';

export type EstadoTramite =
    | 'REGISTRADO' | 'EN_FIRMAS' | 'PRESENTADO' | 'OBSERVADO'
    | 'INSCRITO' | 'CERRADO' | 'ANULADO';

export interface Tramite {
    id: number;
    codigo: string;
    cliente_id: number;
    placa: string | null;
    marca: string;
    modelo: string;
    anio: number;
    estado: EstadoTramite;
    monto: number | null;
    cliente?: Cliente;
    createdAt: string;
    updatedAt: string;
}

export interface TramiteFiltros {
    estado?: string;
    busqueda?: string;
    page?: number;
    pageSize?: number;
}