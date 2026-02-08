import { SEEDER_MESSAGES } from '#constants';
import documentTypes from '#data/document-types' with { type: 'json' };
import models from '#models';

const { DocumentType } = models;

export const insertDocumentTypes = async () => {
   console.log(SEEDER_MESSAGES.DOCUMENT_TYPES.INSERTING);
   try {
      const existingDocumentTypes = await DocumentType.findAll();
      if (existingDocumentTypes.length > 0) {
         console.log(SEEDER_MESSAGES.DOCUMENT_TYPES.ALREADY_EXISTS);
         return;
      }
      const insertedDocumentTypes = await DocumentType.bulkCreate(documentTypes);
      console.log(SEEDER_MESSAGES.DOCUMENT_TYPES.INSERTED(insertedDocumentTypes.length));
   } catch (error) {
      console.log(SEEDER_MESSAGES.DOCUMENT_TYPES.ERROR(error));
   }
};
