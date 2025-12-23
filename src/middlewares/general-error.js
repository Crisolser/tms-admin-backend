import { HTTP_STATUS, APP_MESSAGES } from '#constants';

export const errorHandler = (err, req, res, _next) => {
  console.error(
    JSON.stringify({
      method: req.method,
      originalUrl: req.originalUrl,
      ip: req.ip,
      body: req.body,
      headers: req.headers,
    })
  );
  console.error(err);
  res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message || APP_MESSAGES.ERROR.SERVER,
    ...err.additionalData,
  });
};
