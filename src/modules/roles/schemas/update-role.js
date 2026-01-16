import { z } from 'zod';
import { CreateRoleSchema } from './create-role.js';

export const UpdateRoleSchema = CreateRoleSchema.extend({
    is_active: z.boolean({
        message: 'El estado debe ser verdadero o falso',
    }),
}).strict();