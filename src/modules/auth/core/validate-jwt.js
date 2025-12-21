import jwt from 'jsonwebtoken';
import { error } from '#helpers';
import env from '#config/env';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';

export const validateJWT = token => {
  try {
    const decoded = jwt.verify(token, env.SECRET_JWT);
    return decoded;
  } catch (err) {
    const statusCode = HTTP_STATUS.UNAUTHORIZED;
    throw error(APP_MESSAGES.AUTH.INVALID_TOKEN, { description: err.message }, statusCode);
  }
};
