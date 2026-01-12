import { successHandler } from '#helpers';
import { APP_MESSAGES } from '#constants';
import RoleService from '#rolesmodule/service/role-service';

export const getRoles = async (req, res, next) => {
    try {
        const query = req.validated.query;
        const roles = await RoleService.getAll(query);
        const message = APP_MESSAGES.ROLE.GET_LIST;
        const additionalData = { ...roles };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const createRole = async (req, res, next) => {
    try {
        const data = req.validated.body;
        const newRoleId = await RoleService.create(data);
        const message = APP_MESSAGES.ROLE.CREATED;
        const additionalData = { role_id: newRoleId };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const getRoleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const role = {};
        const message = APP_MESSAGES.ROLE.GET_ONE(id);
        const additionalData = { role };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedRole = { id, ...changes };
        const message = APP_MESSAGES.ROLE.UPDATED(id);
        const additionalData = { role: updatedRole };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const message = APP_MESSAGES.ROLE.DELETED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};

export default {
    getRoles,
    createRole,
    getRoleById,
    updateRole,
    deleteRole
};