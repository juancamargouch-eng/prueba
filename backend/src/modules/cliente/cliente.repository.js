import { DataTypes, Op } from "sequelize";
import db from "../../shared/db.js";

//esquema de tabla cliente
const Cliente = db.define('cliente', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_doc: {
        type: DataTypes.ENUM('DNI', 'CE', 'RUC'),
        allowNull: false
    },
    num_doc: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ap_paterno: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ap_materno: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    fecha_nac: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: 'cliente',
    indexes: [
        { unique: true, fields: ['tipo_doc', 'num_doc'] },
    ]
});

//funciones CRUD
export const crear = async (datos, options = {}) => {
    return Cliente.create(datos, options);
};

export const listar = async ({ busqueda, page = 1, pageSize = 10 } = {}) => {
    const where = {};
    if (busqueda) {
        where[Op.or] = [
            { num_doc: { [Op.like]: `%${busqueda}%` } },
            { nombres: { [Op.like]: `%${busqueda}%` } },
            { ap_paterno: { [Op.like]: `%${busqueda}%` } },
        ];
    }

    const { count, rows } = await Cliente.findAndCountAll({
        where,
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: [['id', 'DESC']]
    });

    return {
        total: count,
        data: rows
    };
};

export const actualizar = async (id, datos) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    return cliente.update(datos);
};

export const buscarPorId = async (id) => {
    return Cliente.findByPk(id);
};

export const buscarPorDoc = async (tipo_doc, num_doc, options = {}) => {
    return Cliente.findOne({
        where: { tipo_doc, num_doc },
        ...options
    });
};

export default Cliente;