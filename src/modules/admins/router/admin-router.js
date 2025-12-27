import { Router } from 'express';
import { validateRequest, validatePermission } from '#middlewares';
import { 
    ListAdminsSchema, 
    CreateAdminSchema, 
    GetAdminSchema,
    UpdateAdminSchema,
    ChangePasswordSchema,
    UpdateAdminRolesSchema
} from '#adminsmodule/schemas/index';
import {
    getAdmins,
    createAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    changeAdminPassword,
    getAdminRoles,
    assignAdminRoles
} from '#adminsmodule/controller/admin-controller';

const router = Router();

router.get(
    '/', 
    validatePermission('admin:read'), 
    validateRequest(ListAdminsSchema, 'query'),
    getAdmins
);
router.post(
    '/', 
    validatePermission('admin:create'),
    validateRequest(CreateAdminSchema, 'body'),
    createAdmin
);
router.get(
    '/:id', 
    validatePermission('admin:read'), 
    validateRequest(GetAdminSchema, 'params'),
    getAdminById
);
router.put(
    '/:id', 
    validatePermission('admin:update'),
    validateRequest(GetAdminSchema, 'params'),
    validateRequest(UpdateAdminSchema, 'body'), 
    updateAdmin
);
router.delete(
    '/:id', 
    validatePermission('admin:delete'), 
    validateRequest(GetAdminSchema, 'params'),
    deleteAdmin
);
router.put(
    '/:id/password', 
    validatePermission('admin:change-password'), 
    validateRequest(GetAdminSchema, 'params'),
    validateRequest(ChangePasswordSchema, 'body'),
    changeAdminPassword
);
router.get(
    '/:id/roles', 
    validatePermission('admin:assign-roles'), 
    validateRequest(GetAdminSchema, 'params'),
    getAdminRoles
);
router.put(
    '/:id/roles', 
    validatePermission('admin:assign-roles'),
    validateRequest(GetAdminSchema, 'params'),
    validateRequest(UpdateAdminRolesSchema, 'body'),
    assignAdminRoles
);

export default router;