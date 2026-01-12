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
    ListRolesSchema
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
    createRole
);

router.get(
    '/:id', 
    validatePermission('role:read'),
    getRoleById
);

router.put(
    '/:id', 
    validatePermission('role:update'),
    updateRole
);

router.delete(
    '/:id', 
    validatePermission('role:delete'),
    deleteRole
);

export default router;