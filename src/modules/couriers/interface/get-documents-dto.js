import { DOCUMENT_LABELS } from '#enums';

export const getDocumentsDto = (documents) => {
    const documentsDto = {
        dni_front: null,
        dni_back: null,
        curp: null,
        address_proof: null,
        license_front: null,
        cfdi: null,
        bank_statement: null,
        circulation_card: null
    }
    documents.forEach(document => {
        const documentType = document.document_type_id;
        const documentLabel = DOCUMENT_LABELS[documentType];
        if (documentLabel) {
            documentsDto[documentLabel] = {
                id: document.id,
                file_name: document.file_name,
                type: documentLabel,
                type_id: documentType,
                file_url: document.file_url,
                status: document.status
            }
        }
    });
    return documentsDto;
}