import { Router } from 'express';
import { validateRequest, validatePermission } from '#middlewares';

const router = Router();

router.get(
    '/', 
    validatePermission('role:read'),
    (req, res) => res.send('List Roles')
);

router.post(
    '/', 
    validatePermission('role:create'),
    (req, res) => res.send('Create Role')
);

router.get(
    '/:id', 
    validatePermission('role:read'),
    (req, res) => res.send(`Get Role ${req.params.id}`)
);

router.put(
    '/:id', 
    validatePermission('role:update'),
    (req, res) => res.send(`Update Role ${req.params.id}`)
);

router.delete(
    '/:id', 
    validatePermission('role:delete'),
    (req, res) => res.send(`Delete Role ${req.params.id}`)
);

export default router;