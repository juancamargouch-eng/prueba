import express from 'express';
import cors from 'cors';
import { clienteRouter } from './modules/cliente/index.js';
import { errorMiddleware } from './shared/error.middleware.js';
import { tramiteRouter } from './modules/tramite/index.js';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

//rutas
app.use('/api/clientes', clienteRouter);
app.use('/api/tramites', tramiteRouter);
//manejo de errores
app.use(errorMiddleware);

export default app;