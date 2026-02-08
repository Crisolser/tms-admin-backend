import { HTTP_STATUS } from '#constants';

export const error = (message, additionalData, statusCode) => {
   let newError = new Error(message);
   newError.statusCode = HTTP_STATUS.BAD_REQUEST;
   if (additionalData) newError.additionalData = additionalData;
   if (statusCode) newError.statusCode = statusCode;
   return newError;
};
