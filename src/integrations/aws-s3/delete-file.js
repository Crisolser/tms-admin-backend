import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import env from '#config/env';
import { error } from '#helpers';
import { S3_MESSAGES } from '#constants';
import s3Client from './s3-client.js';

const { AWS_S3_BUCKET } = env;

export async function deleteFile(fileName) {
    const command = new DeleteObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
    });

    try {
        await s3Client.send(command);
    } catch (err) {
        const errMessage = err.message;
        throw error(S3_MESSAGES.DELETE_ERROR, { details: errMessage });
    }
}