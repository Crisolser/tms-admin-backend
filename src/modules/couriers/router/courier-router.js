import { Router } from 'express';
import { validatePermission } from '#middlewares';
import {
    getCouriers,
    createCourier,
    getCourier,
    updateCourier,
    deleteCourier,
    changeCourierPassword,
    changeCourierStatus,
    getCourierPackages
} from '#couriersmodule/controller/courier-controller';

const router = Router();

router.get(
    '/', 
    validatePermission('courier:read'),
    getCouriers
);
router.post(
    '/',
    validatePermission('courier:create'),
    createCourier
);
router.get(
    '/:courierId',
    validatePermission('courier:read'),
    getCourier
);
router.put(
    '/:courierId',
    validatePermission('courier:update'),
    updateCourier
);
router.delete(
    '/:courierId',
    validatePermission('courier:delete'),
    deleteCourier
);
router.patch(
    '/:courierId/password',
    validatePermission('courier:change-password'),
    changeCourierPassword
);
router.patch(
    '/:courierId/status/:statusId',
    validatePermission('courier:change-status'),
    changeCourierStatus
);

router.get(
    '/:courierId/packages/:type',
    validatePermission('courier:read'),
    getCourierPackages
);

export default router;