export type EstadoTramite =
    | 'REGISTRADO' | 'EN_FIRMAS' | 'PRESENTADO' | 'OBSERVADO'
    | 'INSCRITO' | 'CERRADO' | 'ANULADO';

export type TipoDoc = 'DNI' | 'CE' | 'RUC';

export interface Cliente {
    id: number;
    tipo_doc: TipoDoc;
    num_doc: string;
    nombres: string;
    ap_paterno: string;
    ap_materno: string | null;
    email: string | null;
    telefono: string | null;
    fecha_nac: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Tramite {
    id: number;
    codigo: string;
    cliente_id: number;
    cliente?: Cliente;
    placa: string | null;
    marca: string;
    modelo: string;
    anio: number;
    estado: EstadoTramite;
    monto: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface Seguimiento {
    id: number;
    tramite_id: number;
    estado_anterior: EstadoTramite | null;
    estado_nuevo: EstadoTramite;
    comentario: string | null;
    usuario: string | null;
    createdAt: string;
}

export interface ApiResponse<T> {
    ok: boolean;
    data: T;
    meta?: { total: number; page: number; pageSize: number; totalPages: number };
    mensaje?: string;
    errores?: { campo: string; detalle: string }[];
}

export interface ClientePayload {
    tipo_doc: TipoDoc;
    num_doc: string;
    nombres: string;
    ap_paterno: string;
    ap_materno?: string;
    email?: string;
    telefono?: string;
}

export interface TramiteFormValues {
    marca: string;
    modelo: string;
    anio: number;
    placa?: string;
    monto?: number;
    cliente: ClientePayload;
}