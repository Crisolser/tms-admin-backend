import { z } from 'zod';
import { is } from 'zod/locales';

export const UpdateAdminRolesSchema = z.object({
    roles: z
        .array(
            z.object({
                id: z
                    .number({
                        message: (issue) => issue.input == undefined ? 'El ID del rol es obligatorio' : 'Debe ser un número válido',
                    }),
                name: z
                    .string({
                        message: (issue) => issue.input == undefined ? 'El nombre del rol es obligatorio' : 'Debe ser una cadena de texto',
                    }),
                is_active_in_admin: z
                    .boolean({
                        message: (issue) => issue.input == undefined ? 'El estado activo del rol es obligatorio' : 'Debe ser un valor booleano',
                    }),
            },{
                message: 'Rol inválido'
            }).strict()
        , { 
            message: 'Debe ser un arreglo de roles válidos' 
        }
        )
        .min(1, { message: 'Debe asignar al menos un rol' }),
}).strict();