import { HTTP_STATUS } from '#constants';

export const successHandler = (req, res, { message, additionalData, statusCode }) => {
   if (!statusCode) statusCode = HTTP_STATUS.OK;
   let response = {
      message,
      ...additionalData,
   };
   console.info(
      JSON.stringify({
         method: req.method,
         originalUrl: req.originalUrl,
         ip: req.ip,
         body: req.body,
         headers: req.headers,
      })
   );
   res.status(statusCode).json(response);
};
