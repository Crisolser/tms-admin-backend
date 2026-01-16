import { z } from 'zod';

export const ListRolesSchema = z.object({
    limit: z
        .string()
        .regex(/^\d+$/, { message: 'Debe ser un número válido' })
        .transform(Number)
        .refine(val => val >= 1, { message: 'El valor debe ser mayor o igual a 1' })
        .refine(val => val <= 200, { message: 'El valor debe ser menor o igual a 200' })
        .default(10)
        .optional(),
    page: z
        .string()
        .regex(/^\d+$/, { message: 'Debe ser un número válido' })
        .transform(Number)
        .refine(
            val => val >= 1, { message: 'El mínimo es 1' }
        )
        .default(1)
        .optional(),
    name: z
        .string()
        .max(100, { message: 'Debe tener máximo 100 caracteres' })
        .trim()
        .optional(),
    id: z
        .string()
        .regex(/^\d+$/, { message: 'Debe ser un número válido' })
        .transform(Number)
        .optional()
});