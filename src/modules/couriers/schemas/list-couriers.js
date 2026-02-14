import { z } from 'zod';
import { LIST_STATUS, STATUS_DESCRIPTIONS } from '#enums';

const LIST_STATUS_OPTIONS = LIST_STATUS.map(status => `[${status}: ${STATUS_DESCRIPTIONS[status]}]`).join(', ');

export const ListCouriersSchema = z
   .object({
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
         .refine(val => val >= 1, { message: 'El mínimo es 1' })
         .default(1)
         .optional(),
      email: z
         .string()
         .max(100, { message: 'Debe tener máximo 100 caracteres' })
         .transform(val => (val === '' ? undefined : val))
         .optional(),
      phone: z
         .string()
         .regex(/^\d*$/, { message: 'Solo se permiten dígitos' })
         .transform(val => (val === '' ? undefined : val))
         .optional(),
      status: z
         .string()
         .regex(/^\d*$/, { message: 'Debe ser un número válido' })
         .transform(val => (val === '' ? undefined : Number(val)))
         .refine(val => val === undefined || LIST_STATUS.includes(val), {
            message: 'Estado de cuenta inválido, opciones disponibles ' + LIST_STATUS_OPTIONS,
         })
         .optional(),
      id: z
         .string()
         .regex(/^\d*$/, { message: 'Debe ser un número válido' })
         .transform(val => (val === '' ? undefined : Number(val)))
         .optional(),
   })
   .strict();