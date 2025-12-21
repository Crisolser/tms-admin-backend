import { APP_MESSAGES, HTTP_STATUS } from '#constants';

export const syntaxError = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: APP_MESSAGES.ERROR.JSON_SYNTAX,
    });
  }
  next(err);
};
