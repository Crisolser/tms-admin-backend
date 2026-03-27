export const DOCUMENT_STATUS = {
    PENDING: 1,
    SUCCESS: 2,
    ERROR: 3
};

export const DOCUMENT_STATUS_LABELS = {
    [DOCUMENT_STATUS.PENDING]: 'pending',
    [DOCUMENT_STATUS.SUCCESS]: 'success',
    [DOCUMENT_STATUS.ERROR]: 'error'
};

export const DOCUMENT_STATUS_VALUES = Object.values(DOCUMENT_STATUS);

export const DOCUMENT_STATUS_KEYS = Object.keys(DOCUMENT_STATUS);