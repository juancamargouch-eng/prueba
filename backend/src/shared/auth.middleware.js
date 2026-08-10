import jwt from 'jsonwebtoken';

class AuthMiddlewareError extends Error {
    constructor(mensaje, status) {
        super(mensaje);
        this.status = status;
    }
}

export const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return next(new AuthMiddlewareError('Token no proporcionado', 401));
    }
    const token = header.split(' ')[1];
    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        next(new AuthMiddlewareError('Token inválido o expirado', 401));
    }
};