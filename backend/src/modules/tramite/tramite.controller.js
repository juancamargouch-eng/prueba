import * as tramiteService from './tramite.service.js';
import {
    crearTramiteSchema,
    actualizarTramiteSchema,
    cambiarEstadoSchema,
    listarTramiteQuerySchema,
    idParamSchema,
} from './tramite.schema.js';
import { ok } from '../../shared/response.js';

export const crear = async (req, res) => {
    const datos = crearTramiteSchema.parse(req.body);
    const tramite = await tramiteService.crearTramite(datos);
    res.status(201).json(ok(tramite));
};

export const listar = async (req, res) => {
    const query = listarTramiteQuerySchema.parse(req.query);
    const resultado = await tramiteService.listarTramites(query);
    res.status(200).json(ok(resultado.data, resultado.meta));
};

export const obtenerPorId = async (req, res) => {
    const { id } = idParamSchema.parse(req.params);
    const tramite = await tramiteService.obtenerTramitePorId(id);
    res.status(200).json(ok(tramite));
};

export const actualizar = async (req, res) => {
    const { id } = idParamSchema.parse(req.params);
    const datos = actualizarTramiteSchema.parse(req.body);
    const tramite = await tramiteService.actualizarTramite(id, datos);
    res.status(200).json(ok(tramite));
};

export const cambiarEstado = async (req, res) => {
    const { id } = idParamSchema.parse(req.params);
    const { nuevo_estado, comentario, usuario } = cambiarEstadoSchema.parse(req.body);
    const tramite = await tramiteService.cambiarEstado(id, nuevo_estado, comentario, usuario);
    res.status(200).json(ok(tramite));
};

export const eliminar = async (req, res) => {
    const { id } = idParamSchema.parse(req.params);
    await tramiteService.eliminarTramite(id);
    res.status(200).json(ok({ eliminado: true }));
};