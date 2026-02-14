import { z } from 'zod';
import { GetCourierSchema } from './get-courier.js';
import { LIST_STATUS, STATUS_DESCRIPTIONS } from '#enums';
const LIST_STATUS_OPTIONS = LIST_STATUS.map(status => `[${status}: ${STATUS_DESCRIPTIONS[status]}]`).join(', ');

export const ChangeStatusSchema = GetCourierSchema.extend({
   statusId: z
      .string()
        .regex(/^\d+$/, { message: 'Debe ser un número válido' })
        .refine(val => LIST_STATUS.includes(Number(val)), {
            message: `El estado debe ser uno de los siguientes: ${LIST_STATUS_OPTIONS}`
        })
        .transform(Number),
});