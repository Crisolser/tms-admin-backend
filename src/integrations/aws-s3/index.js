import { getFileUrl } from './get-file-by-signed-url.js';
import { uploadFile } from './upload-file.js';
import { deleteFile } from './delete-file.js';
import { existFile } from './exist-file.js';
import { getSignedUrlForUpdate } from './get-sindet-url-for-update.js';

export default {
    getFileUrl,
    uploadFile,
    deleteFile,
    existFile,
    getSignedUrlForUpdate
};