import * as seguimientoRepository from './seguimiento.repository.js';

export const obtenerHistorial = async (tramiteId) => {
    return seguimientoRepository.listarPorTramite(tramiteId);
};