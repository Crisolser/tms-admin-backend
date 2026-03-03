import { z } from 'zod';

export const ConfirmProfilePhotoUploadSchema = z.object({
    file_name: z
        .string({
            error: issue => issue.input === undefined ? 'El nombre del archivo es requerido' : 'El nombre del archivo debe ser una cadena de texto'
        })
        .min(1, 'El nombre del archivo no puede estar vacío')
});