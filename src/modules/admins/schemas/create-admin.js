import { z } from 'zod';
import { LIST_STATUS, STATUS_DESCRIPTIONS } from '#enums';

const LIST_STATUS_OPTIONS = LIST_STATUS.map(status => `[${status}: ${STATUS_DESCRIPTIONS[status]}]`).join(', ');


export const CreateAdminSchema = z.object({
    name: z
        .string({
            message: (issue) => issue.input == undefined ? 'El nombre es obligatorio' : 'Debe ser una cadena de texto',
        })
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        .max(50, { message: 'El nombre debe tener máximo 50 caracteres' }),
    paternal_surname: z
        .string({
            message: (issue) => issue.input == undefined ? 'El apellido paterno es obligatorio' : 'Debe ser una cadena de texto',
        })
        .min(2, { message: 'El apellido paterno debe tener al menos 2 caracteres' })
        .max(50, { message: 'El apellido paterno debe tener máximo 50 caracteres' }),
    maternal_surname: z
        .string({
            message: (issue) => issue.input == undefined ? 'El apellido materno es obligatorio' : 'Debe ser una cadena de texto',
        })
        .min(2, { message: 'El apellido materno debe tener al menos 2 caracteres' })
        .max(50, { message: 'El apellido materno debe tener máximo 50 caracteres' }),
    email: z
        .email({ message: 'Debe ser un correo electrónico válido' })
        .toLowerCase()
        .max(100, { message: 'Debe tener máximo 100 caracteres' }),
    phone: z
        .string()
        .regex(/^\d*$/, { message: 'Solo se permiten dígitos' })
        .min(10, { message: 'Debe tener al menos 10 caracteres' })
        .max(12, { message: 'Debe tener máximo 12 caracteres' }),
    password: z
        .string()
        .min(8, { message: 'Debe tener al menos 8 caracteres' })
        .max(100, { message: 'Debe tener máximo 100 caracteres' })
        .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
        .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula' })
        .regex(/\d/, { message: 'La contraseña debe contener al menos un número' })
        .regex(/[@$!%*?&#]/, { message: 'La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #)' }),
    status: z
        .number({
            message: (issue) => issue.input == undefined ? 'El estado de la cuenta es obligatorio' : 'Debe ser un número válido',
        })
        .refine(
            val => LIST_STATUS.includes(val), 
            { message: 'Estado de cuenta inválido, opciones disponibles ' + LIST_STATUS_OPTIONS }
        )
        .default(1)
        .optional(),
}).strict();