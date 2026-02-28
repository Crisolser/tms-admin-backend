import { z } from 'zod';
import { MIME_TYPES } from '#constants';

const mimeTypeOptionsText = MIME_TYPES.COURIER_PROFILE_PHOTO.map(type => `${type}`).join(', ');

export const createUrlForProfilePhotoSchema = z.object({
    mime_type: z
        .string()
        .refine(value => MIME_TYPES.COURIER_PROFILE_PHOTO.includes(value), {
            message: `Tipo de archivo inválido. Tipos permitidos: ${mimeTypeOptionsText}`
        })
});