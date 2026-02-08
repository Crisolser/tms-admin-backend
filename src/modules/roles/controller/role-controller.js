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
   } catch (err) {
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
   } catch (err) {
      return next(err);
   }
};

export const getRoleById = async (req, res, next) => {
   try {
      const { id } = req.validated.params;
      const role = await RoleService.getById(id);
      const message = APP_MESSAGES.ROLE.GET_ONE(id);
      const additionalData = { role };
      return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const updateRole = async (req, res, next) => {
   try {
      const { id } = req.validated.params;
      const changes = req.validated.body;
      const updatedRole = await RoleService.update(id, changes);
      const message = APP_MESSAGES.ROLE.UPDATED(id);
      const additionalData = { ...updatedRole };
      return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const deleteRole = async (req, res, next) => {
   try {
      const { id } = req.validated.params;
      await RoleService.remove(id);
      const message = APP_MESSAGES.ROLE.DELETED(id);
      const additionalData = { role_id: id };
      return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const getRolePermissions = async (req, res, next) => {
   try {
      const { id } = req.validated.params;
      const permissions = await RoleService.getPermissions(id);
      const message = APP_MESSAGES.ROLE.GET_PERMISSIONS(id);
      const additionalData = { permissions };
      return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const updateRolePermissions = async (req, res, next) => {
   try {
      const { id } = req.validated.params;
      const { permissions } = req.validated.body;
      const { added, removed } = await RoleService.updatePermissions(id, permissions);
      const message = APP_MESSAGES.ROLE.UPDATED_PERMISSIONS(id);
      const additionalData = {
         permissions_added: added,
         permissions_removed: removed,
      };
      return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export default {
   getRoles,
   createRole,
   getRoleById,
   updateRole,
   deleteRole,
   getRolePermissions,
   updateRolePermissions,
};
