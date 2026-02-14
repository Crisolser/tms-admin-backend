export const DOCUMENT_IDS = {
    'dni-front': 1,
    'dni-back': 2,
    'curp': 3,
    'addres-proof': 4,
    'license-front': 5,
    'cfdi': 6,
    'banck-statement': 7,
    'circulation-card': 8
};

export const DOCUMENT_KEYS = Object.keys(DOCUMENT_IDS);

export const DOCUMENT_VALUES = Object.values(DOCUMENT_IDS);

export const DOCUMENT_LABELS = {
    [DOCUMENT_IDS['dni-front']]: 'dni-front',
    [DOCUMENT_IDS['dni-back']]: 'dni-back',
    [DOCUMENT_IDS['curp']]: 'curp',
    [DOCUMENT_IDS['addres-proof']]: 'addres-proof',
    [DOCUMENT_IDS['license-front']]: 'license-front',
    [DOCUMENT_IDS['cfdi']]: 'cfdi',
    [DOCUMENT_IDS['banck-statement']]: 'banck-statement',
    [DOCUMENT_IDS['circulation-card']]: 'circulation-card'
};