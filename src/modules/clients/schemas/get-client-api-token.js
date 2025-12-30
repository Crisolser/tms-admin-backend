import { z } from 'zod';
import { id } from 'zod/locales';

export const GetClientApiTokenSchema = z.object({
    id: z
        .string()
        .regex(/^\d+$/, { message: 'Debe ser un número válido' })
        .transform(Number),
    tokenId: z
        .string()
        .regex(/^\d+$/, { message: 'Debe ser un número válido' })
        .transform(Number),
}).strict();