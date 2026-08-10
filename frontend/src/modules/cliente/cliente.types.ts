export interface Cliente {
    id: number;
    tipo_doc: 'DNI' | 'CE' | 'RUC';
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