import { z } from 'zod';

export const ChangePasswordSchema = z.object({
    password: z
        .string({ error: issue => issue.input === undefined ? 'La contraseña es requerida' : 'La contraseña debe ser una cadena de texto' })
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(255, 'La contraseña no puede tener más de 255 caracteres')
        .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
        .regex(/\d/, 'La contraseña debe contener al menos un número')
        .regex(/[#@$!%*?&]/, 'La contraseña debe contener al menos un caracter especial (#@$!%*?&)'),
}).strict();