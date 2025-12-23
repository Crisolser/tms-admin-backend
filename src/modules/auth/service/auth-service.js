import bcrypt from 'bcrypt';
import env from '#config/env';
import { error } from '#helpers';
import { validateJWT, createJWT } from '#authmodule/core/index';
import UserRepository from '#repository/admin';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';
import { INACTIVE_STATUSES } from '#enums';

const createToken = async credentials => {
  const { email, password } = credentials;
  const { AUTH_ACCESS_TOKEN_EXPIRATION, AUTH_REFRESH_TOKEN_EXPIRATION } = env;

  const user = await UserRepository.findOneByEmail(email);
  if (!user) throw error(APP_MESSAGES.AUTH.INVALID_CREDENTIALS, '', HTTP_STATUS.UNAUTHORIZED);
  if (INACTIVE_STATUSES.includes(user.status)) throw error(APP_MESSAGES.ADMIN.DISABLED, '', HTTP_STATUS.FORBIDDEN);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw error(APP_MESSAGES.AUTH.INVALID_CREDENTIALS, '', HTTP_STATUS.UNAUTHORIZED);

  const permissions = await UserRepository.getPermissions(user.id);

  const admin = {
    id: user.id,
    email: user.email,
    name: `${user.name} ${user.surname || ''}`.trim(),
  };

  const token = createJWT(
    {
      admin,
      permissions
    },
    AUTH_ACCESS_TOKEN_EXPIRATION
  );

  const refreshToken = createJWT(
    {
      admin,
    },
    AUTH_REFRESH_TOKEN_EXPIRATION
  );

  return {
    token,
    refresh_token: refreshToken,
  };
};

const updateToken = async headers => {
  const refreshToken = headers['x-refresh-token'];
  const { AUTH_ACCESS_TOKEN_EXPIRATION } = env;

  if (!refreshToken) throw error(APP_MESSAGES.AUTH.NOT_REFRESH_TOKEN, '', HTTP_STATUS.UNAUTHORIZED);
  const decoded = validateJWT(refreshToken);

  let { admin } = decoded;
  if (!admin) throw error(APP_MESSAGES.AUTH.INVALID_REFRESH_TOKEN, '', HTTP_STATUS.UNAUTHORIZED);

  const user = await UserRepository.findOneByEmail(admin.email);
  if (!user) throw error(APP_MESSAGES.ADMIN.NOT_FOUND, '', HTTP_STATUS.NOT_FOUND);
  if (user.status == 4) throw error(APP_MESSAGES.ADMIN.DISABLED, '', HTTP_STATUS.FORBIDDEN);

  const permissions = await UserRepository.getPermissions(user.id);

  const newToken = createJWT(
    {
      admin,
      permissions,
    },
    AUTH_ACCESS_TOKEN_EXPIRATION
  );

  return {
    token: newToken,
  };
};

export default {
  createToken,
  updateToken
};