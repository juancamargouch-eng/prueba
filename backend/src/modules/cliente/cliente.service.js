import * as clienteRepository from './cliente.repository.js';

class ClienteError extends Error {
    constructor(mensaje, status, errores = null) {
        super(mensaje);
        this.status = status;
        this.errores = errores;
    }
}

export const crearCliente = async (datos, options = {}) => {
    const existente = await clienteRepository.buscarPorDoc(
        datos.tipo_doc,
        datos.num_doc,
        options
    );

    if (existente) {
        throw new ClienteError('El cliente ya existe con ese documento', 409);
    }

    return clienteRepository.crear(datos, options);
};

export const listarClientes = async ({ busqueda, page, pageSize } = {}) => {
    const paginaActual = Number(page) > 0 ? Number(page) : 1;
    const tamanoPagina = Number(pageSize) > 0 ? Number(pageSize) : 10;

    const { total, data } = await clienteRepository.listar({
        busqueda,
        page: paginaActual,
        pageSize: tamanoPagina,
    });

    return {
        data,
        meta: {
            total,
            page: paginaActual,
            pageSize: tamanoPagina,
            totalPages: Math.ceil(total / tamanoPagina),
        },
    };
};

export const obtenerClientePorId = async (id) => {
    const cliente = await clienteRepository.buscarPorId(id);

    if (!cliente) {
        throw new ClienteError("Cliente no encontrado", 404);
    }

    return cliente;
}

export const actualizarCliente = async (id, datos) => {
    const cliente = await clienteRepository.buscarPorId(id);

    if (!cliente) {
        throw new ClienteError("Cliente no encontrado", 404);
    }

    if (datos.tipo_doc || datos.num_doc) {
        const tipoDocFinal = datos.tipo_doc ?? cliente.tipo_doc;
        const numDocFinal = datos.num_doc ?? cliente.num_doc;

        const duplicado = await clienteRepository.buscarPorDoc(
            tipoDocFinal,
            numDocFinal,
        );

        if (duplicado && duplicado.id !== id) {
            throw new ClienteError('Ya existe otro cliente con ese documento', 409);
        }
    }
    return clienteRepository.actualizar(id, datos);
};

export const obtenerOCrearCliente = async (datosCliente, options = {}) => {
    const existente = await clienteRepository.buscarPorDoc(
        datosCliente.tipo_doc,
        datosCliente.num_doc,
        options
    );

    if (existente) {
        return existente;
    }

    return clienteRepository.crear(datosCliente, options);
};

export { ClienteError };

