export const DOCUMENT_IDS = {
    'dni_front': 1,
    'dni_back': 2,
    'curp': 3,
    'address_proof': 4,
    'license_front': 5,
    'cfdi': 6,
    'bank_statement': 7,
    'circulation_card': 8
};

export const DOCUMENT_KEYS = Object.keys(DOCUMENT_IDS);

export const DOCUMENT_VALUES = Object.values(DOCUMENT_IDS);

export const DOCUMENT_LABELS = {
    [DOCUMENT_IDS['dni_front']]: 'dni_front',
    [DOCUMENT_IDS['dni_back']]: 'dni_back',
    [DOCUMENT_IDS['curp']]: 'curp',
    [DOCUMENT_IDS['address_proof']]: 'address_proof',
    [DOCUMENT_IDS['license_front']]: 'license_front',
    [DOCUMENT_IDS['cfdi']]: 'cfdi',
    [DOCUMENT_IDS['bank_statement']]: 'bank_statement',
    [DOCUMENT_IDS['circulation_card']]: 'circulation_card'
};