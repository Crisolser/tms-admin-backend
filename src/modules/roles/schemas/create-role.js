import { z } from 'zod';

export const CreateRoleSchema = z
   .object({
      name: z
         .string({
            error: issue => (issue.input === undefined ? 'El nombre es obligatorio' : 'El nombre debe ser una cadena de texto'),
         })
         .min(3, { message: 'Debe tener al menos 3 caracteres' })
         .max(100, { message: 'Debe tener máximo 100 caracteres' })
         .trim(),
      description: z
         .string({ message: 'La descripción debe ser una cadena de texto' })
         .max(255, { message: 'Debe tener máximo 255 caracteres' })
         .trim()
         .nullable()
         .optional(),
   })
   .strict();
