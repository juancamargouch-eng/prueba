import { DataTypes } from 'sequelize';
import db from '../../../shared/db.js';
import Tramite from '../tramite.repository.js';

const Seguimiento = db.define('Seguimiento', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    tramite_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    estado_anterior: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    estado_nuevo: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    comentario: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    usuario: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    tableName: 'tramite_seguimiento',
    updatedAt: false, // la tabla solo tiene created_at (es append-only, §3)
});

Seguimiento.belongsTo(Tramite, { foreignKey: 'tramite_id', as: 'tramite' });

export const crear = async (datos, options = {}) => {
    return Seguimiento.create(datos, options);
};

export const listarPorTramite = async (tramiteId, options = {}) => {
    return Seguimiento.findAll({
        where: { tramite_id: tramiteId },
        order: [['created_at', 'ASC']],
        ...options,
    });
};

export default Seguimiento;