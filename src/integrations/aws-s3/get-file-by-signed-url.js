import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import env from '#config/env';
import { error } from '#helpers';
import { S3_MESSAGES } from '#constants';
import s3Client from './s3-client.js';

const { AWS_S3_BUCKET } = env;

export async function getFileUrl(fileName) {
    const command = new GetObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
    });

    try {
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return url;
    } catch (err) {
        const errMessage = err.message;
        throw error(S3_MESSAGES.SIGNED_URL_ERROR,{details: errMessage});
    }
}