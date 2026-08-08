import { Sequelize } from 'sequelize';

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

//Probamos conexion
export const testConnection = async () => {
    try {
        await db.authenticate();
        console.log('base de datos conectada');
    } catch (error) {
        console.error('Base de datos no conectada:', error);
    }
};

export default db
