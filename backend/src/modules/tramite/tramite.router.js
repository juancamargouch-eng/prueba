import { Router } from 'express';
import * as tramiteController from './tramite.controller.js';
import { seguimientoController } from './seguimiento/index.js';

const router = Router();

router.post('/', tramiteController.crear);
router.get('/', tramiteController.listar);
router.get('/:id', tramiteController.obtenerPorId);
router.put('/:id', tramiteController.actualizar);
router.patch('/:id/estado', tramiteController.cambiarEstado);
router.delete('/:id', tramiteController.eliminar);
router.get('/:id/seguimientos', seguimientoController.listar);

export default router;