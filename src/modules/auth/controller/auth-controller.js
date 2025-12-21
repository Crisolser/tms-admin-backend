import { successHandler } from "#helpers";
import { APP_MESSAGES } from "#constants";
import AuthService from "#authmodule/service/auth-service";

export const getSession = async (req, res, next) => {
    try {
        const credentials = req.body;
        const tokens = await AuthService.createToken(credentials);
        const message = APP_MESSAGES.AUTH.LOGIN_SUCCESS;
        const additionalData = { ...tokens };
        return successHandler(req, res, { message, additionalData });
    } catch (err) {
        return next(err);
    }
};
