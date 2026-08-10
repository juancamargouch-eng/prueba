import type { EstadoTramite } from '../../modules/tramite/tramite.types';

export const TRANSICIONES: Record<EstadoTramite, EstadoTramite[]> = {
    REGISTRADO: ['EN_FIRMAS', 'ANULADO'],
    EN_FIRMAS: ['PRESENTADO', 'OBSERVADO', 'ANULADO'],
    OBSERVADO: ['EN_FIRMAS', 'PRESENTADO', 'ANULADO'],
    PRESENTADO: ['INSCRITO', 'OBSERVADO'],
    INSCRITO: ['CERRADO'],
    CERRADO: [],
    ANULADO: [],
};