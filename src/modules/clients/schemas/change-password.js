import { z } from 'zod';

export const ChangePasswordSchema = z
   .object({
      password: z
         .string({
            message: issue => (issue.input == undefined ? 'La contraseña es obligatoria' : 'Debe ser una cadena de texto'),
         })
         .min(8, { message: 'Debe tener al menos 8 caracteres' })
         .max(100, { message: 'Debe tener máximo 100 caracteres' })
         .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
         .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula' })
         .regex(/\d/, { message: 'La contraseña debe contener al menos un número' })
         .regex(/[@$!%*?&#]/, { message: 'La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #)' }),
   })
   .strict();
