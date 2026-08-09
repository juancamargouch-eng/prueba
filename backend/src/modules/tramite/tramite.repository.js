import { DataTypes, Op } from 'sequelize';
import db from '../../shared/db.js';
import { Cliente } from '../cliente/index.js';

const Tramite = db.define('Tramite', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    cliente_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    placa: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    marca: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    anio: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM(
            'REGISTRADO',
            'EN_FIRMAS',
            'PRESENTADO',
            'OBSERVADO',
            'INSCRITO',
            'CERRADO',
            'ANULADO'
        ),
        allowNull: false,
        defaultValue: 'REGISTRADO',
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
}, {
    tableName: 'tramite',
});

Tramite.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

//Funciones del repository

export const crear = async (datos, options = {}) => {
    return Tramite.create(datos, options);
};

export const listar = async ({ estado, busqueda, page = 1, pageSize = 10 } = {}) => {
    const where = {};

    if (estado) {
        where.estado = estado;
    }

    if (busqueda) {
        where[Op.or] = [
            { codigo: { [Op.like]: `%${busqueda}%` } },
            { '$cliente.nombres$': { [Op.like]: `%${busqueda}%` } },
            { '$cliente.ap_paterno$': { [Op.like]: `%${busqueda}%` } },
            { '$cliente.num_doc$': { [Op.like]: `%${busqueda}%` } },
        ];
    }

    const { count, rows } = await Tramite.findAndCountAll({
        where,
        include: [{ model: Cliente, as: 'cliente' }],
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: [['id', 'DESC']],
        subQuery: false,
        distinct: true,
    });

    return { total: count, data: rows };
};

export const buscarPorId = async (id, options = {}) => {
    return Tramite.findByPk(id, {
        include: [{ model: Cliente, as: 'cliente' }],
        ...options,
    });
};

export const buscarPorCodigo = async (codigo, options = {}) => {
    return Tramite.findOne({ where: { codigo }, ...options });
};

export const actualizar = async (id, datos, options = {}) => {
    const tramite = await Tramite.findByPk(id, options);
    if (!tramite) return null;
    return tramite.update(datos, options);
};

export const actualizarEstado = async (id, nuevoEstado, options = {}) => {
    const tramite = await Tramite.findByPk(id, options);
    if (!tramite) return null;
    return tramite.update({ estado: nuevoEstado }, options);
};

export const eliminar = async (id, options = {}) => {
    const tramite = await Tramite.findByPk(id, options);
    if (!tramite) return null;
    await tramite.destroy(options);
    return tramite;
};

// Cuenta cuántos trámites existen ya para un año dado, para generar el correlativo del código de negocio (INM-<año>-<correlativo>).
export const contarPorAnio = async (anio, options = {}) => {
    return Tramite.count({
        where: {
            codigo: { [Op.like]: `INM-${anio}-%` },
        },
        ...options,
    });
};

export default Tramite;