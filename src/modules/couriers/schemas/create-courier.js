import { z } from 'zod';

export const CreateCourierSchema = z.object({
    name: z
        .string({ error: issue => issue.input === undefined ? 'El nombre es requerido' : 'El nombre debe ser una cadena de texto' })
        .min(1, 'El nombre no puede estar vacío')
        .max(100, 'El nombre no puede tener más de 100 caracteres'),
    paternal_surname: z
        .string({ error: issue => issue.input === undefined ? 'El apellido paterno es requerido' : 'El apellido paterno debe ser una cadena de texto' })
        .min(1, 'El apellido paterno no puede estar vacío')
        .max(100, 'El apellido paterno no puede tener más de 100 caracteres'),
    maternal_surname: z
        .preprocess(
            val => val === '' ? null : val,
            z.string({ error: 'El apellido materno debe ser una cadena de texto' })
            .max(100, 'El apellido materno no puede tener más de 100 caracteres')
            .nullable()
        )
        .optional(),
    email: z
        .email({ error: issue => issue.input === undefined ? 'El correo electrónico es requerido' : 'El correo electrónico debe ser válido' })
        .toLowerCase()
        .max(100, 'El correo electrónico no puede tener más de 100 caracteres'),
    phone: z
        .string({ error: issue => issue.input === undefined ? 'El teléfono es requerido' : 'El teléfono debe ser una cadena de texto' })
        .min(10, 'El teléfono no puede tener al menos 10 caracteres')
        .max(12, 'El teléfono no puede tener más de 12 caracteres')
        .regex(/^\d+$/, 'El teléfono debe contener solo números'),
    password: z
        .string({ error: issue => issue.input === undefined ? 'La contraseña es requerida' : 'La contraseña debe ser una cadena de texto' })
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(255, 'La contraseña no puede tener más de 255 caracteres')
        .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
        .regex(/\d/, 'La contraseña debe contener al menos un número')
        .regex(/[#@$!%*?&]/, 'La contraseña debe contener al menos un caracter especial (#@$!%*?&)'),
    vehicle_id: z
        .preprocess(
            val => val === null ? undefined : val, 
            z.number({ error: issue => issue.input === undefined ? 'El ID del vehículo es requerido' : 'El ID del vehículo debe ser un número' })
            .int('El ID del vehículo debe ser un número entero')
            .positive('El ID del vehículo debe ser un número positivo')
            .optional()
            .default(1)
        ),
}).strict();
