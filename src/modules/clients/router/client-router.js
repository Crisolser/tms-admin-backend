import { Router } from 'express';
import { validateRequest, validatePermission } from '#middlewares';
import {
    ListClientsSchema,
    CreateClientSchema,
    GetClientSchema,
    UpdateClientSchema,
    ChangePasswordSchema,
    GetClientApiTokenSchema,
    UpdateClientApiTokenSchema
} from '#clientmodule/schemas/index';
import {
    getClients,
    createClient,
    getClientById,
    updateClient,
    deleteClient,
    changeClientPassword,
    createClientApiToken,
    getClientApiTokens,
    updateClientApiToken
} from '#clientmodule/controller/client-controller';

const router = Router();

router.get(
    '/', 
    validatePermission('client:read'),
    validateRequest(ListClientsSchema, 'query'),
    getClients
);

router.post(
    '/', 
    validatePermission('client:create'),
    validateRequest(CreateClientSchema, 'body'),
    createClient
);

router.get(
    '/:id', 
    validatePermission('client:read'),
    validateRequest(GetClientSchema, 'params'),
    getClientById
);

router.put(
    '/:id', 
    validatePermission('client:update'),
    validateRequest(GetClientSchema, 'params'),
    validateRequest(UpdateClientSchema, 'body'),
    updateClient
);

router.delete(
    '/:id', 
    validatePermission('client:delete'),
    validateRequest(GetClientSchema, 'params'),
    deleteClient
);

router.put(
    '/:id/password', 
    validatePermission('client:change-password'),
    validateRequest(GetClientSchema, 'params'),
    validateRequest(ChangePasswordSchema, 'body'),
    changeClientPassword
);

router.post(
    '/:id/api-tokens',
    validatePermission('client:manage-api-token'),
    validateRequest(GetClientSchema, 'params'),
    createClientApiToken
);

router.get(
    '/:id/api-tokens',
    validatePermission('client:manage-api-token'),
    validateRequest(GetClientSchema, 'params'),
    getClientApiTokens
);

router.put(
    '/:id/api-tokens/:tokenId',
    validatePermission('client:manage-api-token'),
    validateRequest(GetClientApiTokenSchema, 'params'),
    validateRequest(UpdateClientApiTokenSchema, 'body'),
    updateClientApiToken
);

export default router;