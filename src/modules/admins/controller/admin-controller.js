import { successHandler } from '#helpers';
import { APP_MESSAGES } from '#constants';
import AdminService from '#adminsmodule/service/admin-service';

export const getAdmins = async (req, res, next) => {
    try {
        const filters = req.validated.query;
        console.log(filters);
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
        const { id } = req.params;
        const adminData = req.body;
        // Logic to update admin
        const updatedAdmin = {};
        const message = APP_MESSAGES.ADMIN.UPDATED(id);
        const additionalData = { admin: adminData };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Logic to delete admin
        const message = APP_MESSAGES.ADMIN.DELETED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};

export const changeAdminPassword = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        // Logic to change admin password
        const message = APP_MESSAGES.ADMIN.PASSWORD_CHANGED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};

export const getAdminRoles = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Logic to get admin roles
        const roles = [];
        const message = APP_MESSAGES.ADMIN.GET_ROLES(id);
        return successHandler(req, res, { message, additionalData: { roles } });
    }
    catch (err) {
        return next(err);
    }
};

export const assignAdminRoles = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { roles } = req.body;
        // Logic to assign roles to admin
        const message = APP_MESSAGES.ADMIN.UPDATE_ROLES(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};