import { z } from 'zod';

export const UpdateRolePermissionsSchema = z
   .object({
      permissions: z.array(
         z
            .object({
               id: z
                  .number({
                     message: issue => (issue.input === undefined ? 'El id de permiso es obligatorio' : 'El id de permiso debe ser un número'),
                  })
                  .int({
                     message: 'El id de permiso debe ser un número entero',
                  })
                  .positive({
                     message: 'El id de permiso debe ser un número entero positivo',
                  }),
               code: z
                  .string({
                     message: issue =>
                        issue.input === undefined ? 'El código de permiso es obligatorio' : 'El código de permiso debe ser una cadena de texto',
                  })
                  .min(1, {
                     message: 'El código de permiso no puede estar vacío',
                  }),
            })
            .strict()
      ),
   })
   .strict();
