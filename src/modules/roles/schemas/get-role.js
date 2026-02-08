import { z } from 'zod';

export const GetRoleSchema = z
   .object({
      id: z.string().regex(/^\d+$/, { message: 'Debe ser un número válido' }).transform(Number),
   })
   .strict();
