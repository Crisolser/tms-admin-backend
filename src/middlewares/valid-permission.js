import { error } from '#helpers';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';

export const validatePermission = permission => {
  return (req, res, next) => {
    if (!req.permissions.includes(permission)) {
      return next(error(APP_MESSAGES.ERROR.FORBIDDEN, { permission_required: permission }, HTTP_STATUS.FORBIDDEN));
    }
    next();
  };
};
