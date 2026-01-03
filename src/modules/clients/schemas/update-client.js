import { z } from 'zod';
import { LIST_STATUS, STATUS_DESCRIPTIONS } from '#enums';

const LIST_STATUS_OPTIONS = LIST_STATUS.map(status => `[${status}: ${STATUS_DESCRIPTIONS[status]}]`).join(', ');

export const UpdateClientSchema = z.object({
    name: z
        .string({
            message: 'Debe ser una cadena de texto',
        })
        .min(1, { message: 'El nombre debe tener al menos 1 caracter' })
        .max(50, { message: 'Debe tener máximo 50 caracteres' })
        .optional(),
    surname: z
        .string({
            message: 'Debe ser una cadena de texto',
        })
        .min(1, { message: 'El apellido debe tener al menos 1 caracter' })
        .max(50, { message: 'Debe tener máximo 50 caracteres' })
        .optional(),
    email: z
        .email({ 
            message: 'Debe ser un correo electrónico válido'
        })
        .toLowerCase()
        .max(100, { message: 'Debe tener máximo 100 caracteres' })
        .optional(),
    phone: z
        .string({
            message: 'Debe ser una cadena de texto',
        })
        .regex(/^\d*$/, { message: 'Solo se permiten dígitos' })
        .min(10, { message: 'Debe tener al menos 10 caracteres' })
        .max(12, { message: 'Debe tener máximo 12 caracteres' })
        .optional(),
    status: z
        .number({
            message: 'Debe ser un número válido',
        })
        .refine(
            val => LIST_STATUS.includes(val), 
            { message: 'Estado de cuenta inválido, opciones disponibles ' + LIST_STATUS_OPTIONS }
        )
        .optional(),
}).strict();