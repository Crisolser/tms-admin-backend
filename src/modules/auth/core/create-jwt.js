import jwt from 'jsonwebtoken';
import env from '#config/env';

export const createJWT = (payload, expiresIn) => {
  return jwt.sign(payload, env.SECRET_JWT, { expiresIn });
};
