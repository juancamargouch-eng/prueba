import { ZodError } from 'zod';
import { errorResponse } from './response.js';

export const errorMiddleware = (err, req, res, next) => {

    if (err instanceof ZodError) {
        const errores = err.issues.map((issue) => ({
            campo: issue.path.join('.'),
            detalle: issue.message,
        }));
        return res.status(422).json(errorResponse('Datos inválidos', errores));
    }

    if (typeof err.status === 'number') {
        return res.status(err.status).json(errorResponse(err.message, err.errores ?? null));
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json(errorResponse('El registro ya existe'));
    }
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(409).json(errorResponse('Operación inválida: referencia inexistente'));
    }
    if (err.name === 'SequelizeValidationError') {
        const errores = err.errors.map((e) => ({ campo: e.path, detalle: e.message }));
        return res.status(422).json(errorResponse('Datos inválidos', errores));
    }

    console.error(err);
    res.status(500).json(errorResponse('Error inesperado en el servidor'));

};