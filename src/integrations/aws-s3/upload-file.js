import { PutObjectCommand } from '@aws-sdk/client-s3';
import env from '#config/env';
import { error } from '#helpers';
import s3Client from './s3-client.js';
import { S3_MESSAGES } from '#constants';

const { AWS_S3_BUCKET } = env;

export async function uploadFile(fileBuffer, fileName, contentType) {
    const params = {
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: contentType,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
    } catch (err) {
        const errMessage = err.message;
        throw error(S3_MESSAGES.UPLOAD_ERROR, { details: errMessage });
    }
}
    