import { z } from 'zod';
import { GetCourierSchema } from './get-courier.js';
import { COURIER_PACKAGE_TYPES } from '#enums';

const types = Object.values(COURIER_PACKAGE_TYPES).join(', ');

export const GetCourierPackagesSchema = GetCourierSchema.extend({
    type: z
        .string()
        .refine(value => Object.values(COURIER_PACKAGE_TYPES).includes(value), {
            message: `Estatus de paquete inválido. Debe ser uno de los siguientes: ${types}`,
        })
});