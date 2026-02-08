import { Router } from 'express';
import { validateRequest, validatePermission } from '#middlewares';
import {
   getRoles,
   createRole,
   getRoleById,
   updateRole,
   deleteRole,
   getRolePermissions,
   updateRolePermissions,
} from '#rolesmodule/controller/role-controller';
import {
   ListRolesSchema,
   CreateRoleSchema,
   GetRoleSchema,
   UpdateRoleSchema,
   UpdateRolePermissionsSchema,
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

router.get(
   '/:id/permissions',
   validatePermission('role:read'),
   validateRequest(GetRoleSchema, 'params'),
   getRolePermissions
);

router.put(
   '/:id/permissions',
   validatePermission('role:assign-permissions'),
   validateRequest(GetRoleSchema, 'params'),
   validateRequest(UpdateRolePermissionsSchema, 'body'),
   updateRolePermissions
);
export default router;
