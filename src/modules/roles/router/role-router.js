import { Router } from 'express';
import { validateRequest, validatePermission } from '#middlewares';
import {
    getRoles,
    createRole,
    getRoleById,
    updateRole,
    deleteRole
} from '#rolesmodule/controller/role-controller';
import {
    ListRolesSchema,
    CreateRoleSchema,
    GetRoleSchema,
    UpdateRoleSchema
} from '#rolesmodule/schemas/index';

const router = Router();

router.get(
    '/', 
    validatePermission('role:read'),
    validateRequest(ListRolesSchema, 'query'),
    getRoles
);

router.post(
    '/', 
    validatePermission('role:create'),
    validateRequest(CreateRoleSchema, 'body'),
    createRole
);

router.get(
    '/:id', 
    validatePermission('role:read'),
    validateRequest(GetRoleSchema, 'params'),
    getRoleById
);

router.put(
    '/:id', 
    validatePermission('role:update'),
    validateRequest(GetRoleSchema, 'params'),
    validateRequest(UpdateRoleSchema, 'body'),
    updateRole
);

router.delete(
    '/:id', 
    validatePermission('role:delete'),
    validateRequest(GetRoleSchema, 'params'),
    deleteRole
);

export default router;