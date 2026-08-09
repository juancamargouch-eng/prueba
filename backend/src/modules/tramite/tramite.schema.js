import { z } from 'zod';
import { identificarClienteSchema } from '../cliente/cliente.schema.js';
import { crearClienteSchema } from '../cliente/cliente.schema.js';

const placa = z
    .string()
    .trim()
    .max(10, 'placa no debe superar 10 caracteres')
    .optional()
    .nullable();

const marca = z
    .string({ error: 'marca es requerida' })
    .trim()
    .min(2, 'marca debe tener al menos 2 caracteres')
    .max(50, 'marca no debe superar 50 caracteres');

const modelo = z
    .string({ error: 'modelo es requerido' })
    .trim()
    .min(1, 'modelo es requerido')
    .max(50, 'modelo no debe superar 50 caracteres');

const anio = z.coerce
    .number({ error: 'anio debe ser un número' })
    .int('anio debe ser un número entero')
    .min(1990, 'anio no puede ser menor a 1990')
    .max(2027, 'anio no puede ser mayor a 2027');

const monto = z.coerce
    .number({ error: 'monto debe ser un número' })
    .nonnegative('monto no puede ser negativo')
    .optional()
    .nullable();

const estadoEnum = z.enum(
    ['REGISTRADO', 'EN_FIRMAS', 'PRESENTADO', 'OBSERVADO', 'INSCRITO', 'CERRADO', 'ANULADO'],
    { error: 'estado no es válido' }
);

const comentario = z
    .string()
    .trim()
    .max(255, 'comentario no debe superar 255 caracteres')
    .optional()
    .nullable();

// POST /tramites — datos del vehículo + el cliente (por num_doc)
export const crearTramiteSchema = z.object({
    placa,
    marca,
    modelo,
    anio,
    monto,
    cliente: crearClienteSchema, // datos completos: si no existe, se crea con esto
});

// PUT /tramites/:id — Editar datos del vehículo/cliente del trámite
export const actualizarTramiteSchema = z.object({
    placa,
    marca: marca.optional(),
    modelo: modelo.optional(),
    anio: anio.optional(),
    monto,
    cliente: identificarClienteSchema.optional(),
}).refine(
    (datos) => Object.keys(datos).length > 0,
    { error: 'Debes enviar al menos un campo para actualizar' }
);

// PATCH /tramites/:id/estado
export const cambiarEstadoSchema = z.object({
    nuevo_estado: estadoEnum,
    comentario,
    usuario: z.string().trim().max(100).optional().nullable(),
});

// Filtros de la bandeja
export const listarTramiteQuerySchema = z.object({
    estado: estadoEnum.optional(),
    busqueda: z.string().trim().max(100).optional(),
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().max(100).optional(),
});

export const idParamSchema = z.object({
    id: z.coerce.number({ error: 'id debe ser un número' }).int().positive(),
});