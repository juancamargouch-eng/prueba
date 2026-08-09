import { Router } from 'express';
import * as clienteController from './cliente.controller.js';

const router = Router();

router.post('/', clienteController.crear);
router.get('/', clienteController.listar);
router.get('/:id', clienteController.obtenerPorId);
router.put('/:id', clienteController.actualizar);

export default router;