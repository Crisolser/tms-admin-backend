import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email({
        error: (issue) => (issue.input === undefined ? 'El correo es obligatorio' : 'El correo no es válido'),
    }),
  password: z
    .string({
        error: (issue) => (issue.input === undefined ? 'La contraseña es obligatoria' : 'La contraseña debe ser una cadena de texto'),
    })
    .min(1, { 
        error: 'La contraseña no puede estar vacía' 
    }),
}).strict();