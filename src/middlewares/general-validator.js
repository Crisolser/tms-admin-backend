import { error } from '#helpers';
import { APP_MESSAGES } from '#constants';

export const validateRequest = (schema, scope) => (req, res, next) => {
   const information = req[scope || 'body'];

   const zodValidation = schema.safeParse(information);

   if (!zodValidation.success) {
      const zodIssues = zodValidation.error.issues;
      const issuesFormatted = zodIssues.map(issue => {
         const fullPath = issue.path.map(segment => (typeof segment === 'string' ? segment : `[${segment}]`)).join('.');
         const { message, code } = issue;

         const issueFormatted = {
            message,
            parameter: fullPath.length > 0 ? fullPath : undefined,
         };

         if (code === 'unrecognized_keys') {
            issueFormatted.message = APP_MESSAGES.ERROR.INVALID_PARAMS;
            issueFormatted.invalid_params = issue.keys;
         }

         return issueFormatted;
      });
      const validationError = error(APP_MESSAGES.ERROR.BAD_REQUEST, { issues: issuesFormatted });
      next(validationError);
   } else {
      if (!req.validated) req.validated = {};
      req.validated[scope || 'body'] = zodValidation.data;
      next();
   }
};
