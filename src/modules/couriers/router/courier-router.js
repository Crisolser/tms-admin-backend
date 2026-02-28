import { Router } from 'express';
import { validatePermission, validateRequest } from '#middlewares';
import {
    getCouriers,
    createCourier,
    getCourier,
    updateCourier,
    changeCourierPassword,
    changeCourierStatus,
    getCourierPackages,
} from '#couriersmodule/controller/courier-controller';
import {
    ListCouriersSchema,
    CreateCourierSchema,
    GetCourierSchema,
    UpdateCourierSchema,
    ChangePasswordSchema,
    ChangeStatusSchema,
    GetCourierPackagesSchema
} from '#couriersmodule/schemas/index'

const router = Router();

router.get(
    '/', 
    validatePermission('courier:read'),
    validateRequest(ListCouriersSchema, 'query'),
    getCouriers
);
router.post(
    '/',
    validatePermission('courier:create'),
    validateRequest(CreateCourierSchema, 'body'),
    createCourier
);
router.get(
    '/:courierId',
    validatePermission('courier:read'),
    validateRequest(GetCourierSchema, 'params'),
    getCourier
);
router.put(
    '/:courierId',
    validatePermission('courier:update'),
    validateRequest(GetCourierSchema, 'params'),
    validateRequest(UpdateCourierSchema, 'body'),
    updateCourier
);
router.patch(
    '/:courierId/password',
    validatePermission('courier:change-password'),
    validateRequest(GetCourierSchema, 'params'),
    validateRequest(ChangePasswordSchema, 'body'),
    changeCourierPassword
);
router.patch(
    '/:courierId/status/:statusId',
    validatePermission('courier:change-status'),
    validateRequest(ChangeStatusSchema, 'params'),
    changeCourierStatus
);

router.get(
    '/:courierId/packages/:type',
    validatePermission('courier:read'),
    validateRequest(GetCourierPackagesSchema, 'params'),
    getCourierPackages
);



export default router;