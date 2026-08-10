import { z } from 'zod';

export const loginSchema = z.object({
    usuario: z.string().min(1, 'usuario es requerido'),
    password: z.string().min(1, 'password es requerido'),
});