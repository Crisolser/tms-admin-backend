import { z } from 'zod';
import { LIST_STATUS, STATUS_DESCRIPTIONS } from '#enums';

const LIST_STATUS_OPTIONS = LIST_STATUS.map(status => `[${status}: ${STATUS_DESCRIPTIONS[status]}]`).join(', ');


export const UpdateAdminSchema = z.object({
    name: z
        .string({
            message: (issue) => issue.input == undefined ? 'El nombre es obligatorio' : 'Debe ser una cadena de texto',
        })
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        .max(50, { message: 'El nombre debe tener máximo 50 caracteres' })
        .optional(),
    paternal_surname: z
        .string({
            message: (issue) => issue.input == undefined ? 'El apellido paterno es obligatorio' : 'Debe ser una cadena de texto',
        })
        .min(2, { message: 'El apellido paterno debe tener al menos 2 caracteres' })
        .max(50, { message: 'El apellido paterno debe tener máximo 50 caracteres' })
        .optional(),
    maternal_surname: z
        .string({
            message: (issue) => issue.input == undefined ? 'El apellido materno es obligatorio' : 'Debe ser una cadena de texto',
        })
        .min(2, { message: 'El apellido materno debe tener al menos 2 caracteres' })
        .max(50, { message: 'El apellido materno debe tener máximo 50 caracteres' })
        .optional(),
    email: z
        .email({ message: 'Debe ser un correo electrónico válido' })
        .toLowerCase()
        .max(100, { message: 'Debe tener máximo 100 caracteres' })
        .optional(),
    phone: z
        .string()
        .regex(/^\d*$/, { message: 'Solo se permiten dígitos' })
        .min(10, { message: 'Debe tener al menos 10 caracteres' })
        .max(12, { message: 'Debe tener máximo 12 caracteres' })
        .optional(),
    status: z
        .number({
            message: (issue) => issue.input == undefined ? 'El estado de la cuenta es obligatorio' : 'Debe ser un número válido',
        })
        .refine(
            val => LIST_STATUS.includes(val), 
            { message: 'Estado de cuenta inválido, opciones disponibles ' + LIST_STATUS_OPTIONS }
        )
        .optional(),
}).strict();