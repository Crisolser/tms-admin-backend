import CourierRepository from '#repository/courier'
import { APP_MESSAGES } from '#constants';
import { error } from '#helpers';
import { DOCUMENT_IDS } from '#enums';

export const existCourierDocumentType = async (courierId, documentType) => {
    const courier = await CourierRepository.findOneById(courierId);
    if (!courier) throw error(APP_MESSAGES.COURIER.NOT_FOUND(courierId));
    const documentId = DOCUMENT_IDS[documentType];
    const documents = await courier.getDocuments();
    const documentTypeIds = documents.map(doc => doc.document_type_id);
    const hasDocument = documentTypeIds.includes(documentId);
    if (hasDocument) throw error(APP_MESSAGES.COURIER.DOCUMENT_TYPE_EXISTS(documentType));
};