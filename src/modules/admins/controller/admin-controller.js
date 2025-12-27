import { successHandler } from '#helpers';
import { APP_MESSAGES } from '#constants';
import AdminService from '#adminsmodule/service/admin-service';

export const getAdmins = async (req, res, next) => {
    try {
        const filters = req.validated.query;
        const admins = await AdminService.getAll(filters);
        const message = APP_MESSAGES.ADMIN.GET_LIST;
        const additionalData = { ...admins };
        return successHandler(req, res, { message, additionalData });
    } catch (err) {
        return next(err);
    }
};
export const createAdmin = async (req, res, next) => {
    try {
        const data = req.validated.body;
        const newAdmin = await AdminService.create(data);
        const message = APP_MESSAGES.ADMIN.CREATED;
        const additionalData = { admin_id: newAdmin };
        return successHandler(req, res, { message, additionalData });
    } catch (err) {
        return next(err);
    }
};

export const getAdminById = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        const admin = await AdminService.getById(id);
        const message = APP_MESSAGES.ADMIN.GET_ONE(id);
        const additionalData = { admin };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const updateAdmin = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        const changes = req.validated.body;
        const updatedAdmin = await AdminService.update(id, changes);
        const message = APP_MESSAGES.ADMIN.UPDATED(id);
        const additionalData = { ...updatedAdmin };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        await AdminService.remove(id);
        const message = APP_MESSAGES.ADMIN.DELETED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};

export const changeAdminPassword = async (req, res, next) => { 
    try {
        const { id } = req.validated.params;
        const { password } = req.validated.body;
        await AdminService.changePassword(id, password);
        const message = APP_MESSAGES.ADMIN.PASSWORD_CHANGED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};

export const getAdminRoles = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        const roles = await AdminService.getRoles(id);
        const message = APP_MESSAGES.ADMIN.GET_ROLES(id);
        return successHandler(req, res, { message, additionalData: { roles } });
    }
    catch (err) {
        return next(err);
    }
};

export const assignAdminRoles = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        const { roles } = req.validated.body;
        const updatedRoles = await AdminService.updateRoles(id, roles);
        const message = APP_MESSAGES.ADMIN.UPDATE_ROLES(id);
        const additionalData = { ...updatedRoles };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};