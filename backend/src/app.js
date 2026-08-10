import express from 'express';
import cors from 'cors';
import { clienteRouter } from './modules/cliente/index.js';
import { errorMiddleware } from './shared/error.middleware.js';
import { tramiteRouter } from './modules/tramite/index.js';
import { authRouter } from './modules/auth/index.js';
import { authMiddleware } from './shared/auth.middleware.js';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

//rutas
app.use('/api/auth', authRouter);
app.use('/api/clientes', authMiddleware, clienteRouter);
app.use('/api/tramites', authMiddleware, tramiteRouter);
//manejo de errores
app.use(errorMiddleware);

export default app;