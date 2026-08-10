import * as authService from './auth.service.js';
import { loginSchema } from './auth.schema.js';
import { ok } from '../../shared/response.js';

export const login = async (req, res) => {
    const datos = loginSchema.parse(req.body);
    const resultado = authService.login(datos);
    res.status(200).json(ok(resultado));
};