import * as seguimientoService from './seguimiento.service.js';
import { idParamSchema } from '../tramite.schema.js';
import { ok } from '../../../shared/response.js';

export const listar = async (req, res) => {
    const { id } = idParamSchema.parse(req.params);
    const historial = await seguimientoService.obtenerHistorial(id);
    res.status(200).json(ok(historial));
};