import jwt from 'jsonwebtoken';

class AuthError extends Error {
    constructor(mensaje, status) {
        super(mensaje);
        this.status = status;
    }
}

export const login = ({ usuario, password }) => {
    if (usuario !== process.env.AUTH_USER || password !== process.env.AUTH_PASS) {
        throw new AuthError('Credenciales inválidas', 401);
    }
    const token = jwt.sign({ usuario }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return { token, usuario };
};

export { AuthError };