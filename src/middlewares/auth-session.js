import jwt from 'jsonwebtoken';
import { error } from '#helpers';
import env from '#config/env';
import { HTTP_STATUS, APP_MESSAGES } from '#constants';

const { SECRET_JWT } = env;

export const authSession = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw error(APP_MESSAGES.AUTH.NOT_TOKEN, {}, HTTP_STATUS.UNAUTHORIZED);
    if (!authHeader.startsWith('Bearer ')) throw error(APP_MESSAGES.AUTH.NOT_BEARER, {}, HTTP_STATUS.UNAUTHORIZED);
    const token = authHeader.split(' ')[1];
    if (!token) throw error(APP_MESSAGES.AUTH.NOT_TOKEN, {}, HTTP_STATUS.UNAUTHORIZED);
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_JWT);
    } catch (err) {
      throw error(APP_MESSAGES.AUTH.INVALID_TOKEN, { description: err.message }, HTTP_STATUS.UNAUTHORIZED);
    }

    const { admin, permissions } = decoded;

    req.user = { ...admin };
    req.permissions = permissions || [];
    next();
  } catch (err) {
    next(err);
  }
};
