import { z } from 'zod';
import { DOCUMENT_KEYS } from '#enums';

const documentTypeOptionsText = DOCUMENT_KEYS.join(', ');

export const ConfirmDocumentUploadSchema = z.object({
    file_name: z
        .string({
            error: issue => issue.input === undefined ? 'El nombre del archivo es requerido' : 'El nombre del archivo debe ser una cadena de texto'
        })
        .min(1, 'El nombre del archivo no puede estar vacío'),
    document_type: z
        .string()
        .refine(
            value => DOCUMENT_KEYS.includes(value), 
            {
                message: `Tipo de documento inválido. Tipos permitidos: ${documentTypeOptionsText}`
            }
        )
});