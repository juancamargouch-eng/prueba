import { z } from "zod";

//campos reutilizables

const tipoDoc = z.enum(['DNI', 'CE', 'RUC'], {
    error: 'Tipo_doc debe ser DNI; CE o RUC',
});

const numDoc = z
    .string({ error: 'num_doc es requerido' })
    .trim()
    .min(6, 'num_doc debe tener almenos 6 caracteres')
    .max(20, 'num_doc debe tener maximo 20 caracteres')
    .regex(/^[A-Za-z0-9]+$/, 'num_doc debe contener solo letras y números');

const nombres = z
    .string({ error: 'nombres es requerido' })
    .trim()
    .min(2, 'nombres debe tener almenos 2 caracteres')
    .max(100, 'nombres debe tener maximo 100 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'nombres debe contener solo letras');

const apPaterno = z
    .string({ error: 'ap_paterno es requerido' })
    .trim()
    .min(2, 'ap_paterno debe tener almenos 2 caracteres')
    .max(100, 'ap_paterno debe tener maximo 100 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'ap_paterno debe contener solo letras');

const apMaterno = z
    .string()
    .trim()
    .max(100, 'ap_materno debe tener maximo 100 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'ap_materno debe contener solo letras')
    .optional()
    .nullable();

const email = z
    .email('email no tiene formato valido')
    .max(150, 'email no debe superar 150 caracteres')
    .optional()
    .nullable();

const telefono = z
    .string()
    .trim()
    .max(20, 'telefono debe tener maximo 20 caracteres')
    .regex(/^[0-9+\-\s]*$/, 'telefono debe contener solo numeros')
    .optional()
    .nullable();

const fechaNac = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'fecha_nac debe tener formato YYYY-MM-DD')
    .optional()
    .nullable();

//esquemas exportados

export const crearClienteSchema = z.object({
    tipo_doc: tipoDoc,
    num_doc: numDoc,
    nombres,
    ap_paterno: apPaterno,
    ap_materno: apMaterno,
    email,
    telefono,
    fecha_nac: fechaNac
});


export const actualizarClienteSchema = z.object({
    tipo_doc: tipoDoc.optional(),
    num_doc: numDoc.optional(),
    nombres: nombres.optional(),
    ap_paterno: apPaterno.optional(),
    ap_materno: apMaterno,
    email,
    telefono,
    fecha_nac: fechaNac,
}).refine(
    (datos) => Object.keys(datos).length > 0,
    { error: 'Debe proporcionar al menos un campo para actualizar.' }
);

export const identificarClienteSchema = z.object({
    tipo_doc: tipoDoc,
    num_doc: numDoc
});

export const idParamSchema = z.object({
    id: z.coerce.number({ error: 'id debe ser un número' }).int().positive()
});
