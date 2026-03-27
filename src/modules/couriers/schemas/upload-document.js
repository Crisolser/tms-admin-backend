import { z } from 'zod';
import { DOCUMENT_KEYS, DOCUMENT_MIME_TYPES } from '#enums';

const documentTypeOptionsText = DOCUMENT_KEYS.join(', ');

export const CreateUrlForDocumentSchema = z.object({
    document_type: z
        .string()
        .refine(
            value => DOCUMENT_KEYS.includes(value), 
            {
                message: `Tipo de documento inválido. Tipos permitidos: ${documentTypeOptionsText}`
            }
        ),
    mime_type: z
        .string()
}).strict()
.superRefine((data, ctx) => {
  const { document_type, mime_type } = data;
  const docConfig = DOCUMENT_MIME_TYPES[document_type];
  if (!docConfig) return;
  const mimeTypesForDocument = docConfig;
  if (!mimeTypesForDocument.includes(mime_type)) {
    const allowedMimeTypesText = mimeTypesForDocument.join(', ');
    ctx.addIssue({
      code: 'custom',
      message: `Tipo de archivo inválido para ${document_type}. Permitidos: ${allowedMimeTypesText}`,
      path: ['mime_type']
    });
  }
});