import bcrypt from 'bcrypt';
import env from '#config/env';
import { error } from '#helpers';
import { validateJWT, createJWT } from '#authmodule/core/index';
import UserRepository from '#repository/admin';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';

const createToken = async credentials => {
  const { email, password } = credentials;
  const { AUTH_ACCESS_TOKEN_EXPIRATION, AUTH_REFRESH_TOKEN_EXPIRATION } = env;

  const user = await UserRepository.findOneByEmail(email);
  if (!user) throw error(APP_MESSAGES.AUTH.INVALID_CREDENTIALS, '', HTTP_STATUS.UNAUTHORIZED);
  if (user.status == 4) throw error(APP_MESSAGES.ADMIN.DISABLED, '', HTTP_STATUS.FORBIDDEN);

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

export default {
  createToken,
};