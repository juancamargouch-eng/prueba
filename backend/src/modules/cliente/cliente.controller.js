import * as clienteService from './cliente.service.js';
import {
    crearClienteSchema,
    actualizarClienteSchema,
    idParamSchema,
} from './cliente.schema.js';
import { ok } from '../../shared/response.js';

export const crear = async (req, res) => {
    const datos = crearClienteSchema.parse(req.body);
    const cliente = await clienteService.crearCliente(datos);
    res.status(201).json(ok(cliente));
};

export const listar = async (req, res) => {
    const { busqueda, page, pageSize } = req.query;
    const resultado = await clienteService.listarClientes({ busqueda, page, pageSize });
    res.status(200).json(ok(resultado.data, resultado.meta));
};

export const actualizar = async (req, res) => {
    const { id } = idParamSchema.parse(req.params);
    const datos = actualizarClienteSchema.parse(req.body);
    const cliente = await clienteService.actualizarCliente(id, datos);
    res.status(200).json(ok(cliente));
};

export const obtenerPorId = async (req, res) => {
    const { id } = idParamSchema.parse(req.params);
    const cliente = await clienteService.obtenerClientePorId(id);
    res.status(200).json(ok(cliente));
}