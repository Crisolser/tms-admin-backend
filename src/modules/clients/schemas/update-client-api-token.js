import { z } from 'zod';

export const UpdateClientApiTokenSchema = z.object({
    is_active: z
        .boolean({
            message: (issue) => issue.input == undefined ? 'El estado es obligatorio' : 'Debe ser un valor booleano',
        })
}).strict();