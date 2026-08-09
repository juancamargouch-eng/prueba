import db from '../../shared/db.js';
import * as tramiteRepository from './tramite.repository.js';
import { clienteService } from '../cliente/index.js';
import * as seguimientoRepository from './seguimiento/seguimiento.repository.js';

class TramiteError extends Error {
    constructor(mensaje, status, errores = null) {
        super(mensaje);
        this.status = status;
        this.errores = errores;
    }
}

// Máquina de estados: qué transiciones son válidas desde cada estado (§4.1)
const TRANSICIONES = {
    REGISTRADO: ['EN_FIRMAS', 'ANULADO'],
    EN_FIRMAS: ['PRESENTADO', 'OBSERVADO', 'ANULADO'],
    OBSERVADO: ['EN_FIRMAS', 'PRESENTADO', 'ANULADO'],
    PRESENTADO: ['INSCRITO', 'OBSERVADO'],
    INSCRITO: ['CERRADO'],
    CERRADO: [],
    ANULADO: [],
};

const generarCodigo = async (anio, options = {}) => {
    const cantidad = await tramiteRepository.contarPorAnio(anio, options);
    const correlativo = String(cantidad + 1).padStart(4, '0');
    return `INM-${anio}-${correlativo}`;
};

export const crearTramite = async (datos) => {
    const { cliente: datosCliente, ...datosTramite } = datos;
    const anioActual = new Date().getFullYear();

    return db.transaction(async (t) => {
        const options = { transaction: t };

        // 1. Cliente: si existe (por tipo_doc+num_doc) se asocia, si no se crea
        const cliente = await clienteService.obtenerOCrearCliente(datosCliente, options);

        // 2. Generar código de negocio y crear el trámite en REGISTRADO
        const codigo = await generarCodigo(anioActual, options);
        const tramite = await tramiteRepository.crear(
            { ...datosTramite, codigo, cliente_id: cliente.id, estado: 'REGISTRADO' },
            options
        );

        // 3. Primer registro de seguimiento (estado_anterior null)
        await seguimientoRepository.crear(
            {
                tramite_id: tramite.id,
                estado_anterior: null,
                estado_nuevo: 'REGISTRADO',
                comentario: 'Registro inicial del trámite',
                usuario: 'operador',
            },
            options
        );

        return tramiteRepository.buscarPorId(tramite.id, options);
    });
};

export const listarTramites = async ({ estado, busqueda, page, pageSize } = {}) => {
    const paginaActual = Number(page) > 0 ? Number(page) : 1;
    const tamanoPagina = Number(pageSize) > 0 ? Number(pageSize) : 10;

    const { total, data } = await tramiteRepository.listar({
        estado, busqueda, page: paginaActual, pageSize: tamanoPagina,
    });

    return {
        data,
        meta: { total, page: paginaActual, pageSize: tamanoPagina, totalPages: Math.ceil(total / tamanoPagina) },
    };
};

export const obtenerTramitePorId = async (id) => {
    const tramite = await tramiteRepository.buscarPorId(id);
    if (!tramite) throw new TramiteError('Trámite no encontrado', 404);
    return tramite;
};

export const actualizarTramite = async (id, datos) => {
    const { cliente: datosCliente, ...datosTramite } = datos;
    const tramite = await tramiteRepository.buscarPorId(id);
    if (!tramite) throw new TramiteError('Trámite no encontrado', 404);

    return db.transaction(async (t) => {
        const options = { transaction: t };
        let clienteId = tramite.cliente_id;

        if (datosCliente) {
            const cliente = await clienteService.obtenerOCrearCliente(datosCliente, options);
            clienteId = cliente.id;
        }

        await tramiteRepository.actualizar(id, { ...datosTramite, cliente_id: clienteId }, options);
        return tramiteRepository.buscarPorId(id, options);
    });
};

export const cambiarEstado = async (id, nuevoEstado, comentario, usuario) => {
    const tramite = await tramiteRepository.buscarPorId(id);
    if (!tramite) throw new TramiteError('Trámite no encontrado', 404);

    const permitidos = TRANSICIONES[tramite.estado] ?? [];
    if (!permitidos.includes(nuevoEstado)) {
        throw new TramiteError(`No se puede pasar de ${tramite.estado} a ${nuevoEstado}`, 409);
    }

    return db.transaction(async (t) => {
        const options = { transaction: t };
        const estadoAnterior = tramite.estado;

        await tramiteRepository.actualizarEstado(id, nuevoEstado, options);
        await seguimientoRepository.crear(
            { tramite_id: id, estado_anterior: estadoAnterior, estado_nuevo: nuevoEstado, comentario, usuario: usuario ?? 'operador' },
            options
        );

        return tramiteRepository.buscarPorId(id, options);
    });
};

export const eliminarTramite = async (id) => {
    const tramite = await tramiteRepository.buscarPorId(id);
    if (!tramite) throw new TramiteError('Trámite no encontrado', 404);

    if (['INSCRITO', 'CERRADO'].includes(tramite.estado)) {
        throw new TramiteError(`No se puede eliminar un trámite en estado ${tramite.estado}`, 409);
    }

    await tramiteRepository.eliminar(id);
    return tramite;
};

export { TramiteError, TRANSICIONES };