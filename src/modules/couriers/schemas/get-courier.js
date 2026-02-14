import { z } from 'zod';

export const GetCourierSchema = z
   .object({
      courierId: z.string().regex(/^\d+$/, { message: 'Debe ser un número válido' }).transform(Number),
   })
   .strict();