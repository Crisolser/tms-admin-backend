import { Router } from 'express';
import { validateRequest, validatePermission } from '#middlewares';
import {
    ListClientsSchema,
    CreateClientSchema,
    GetClientSchema
} from '#clientmodule/schemas/index';
import {
    getClients,
    createClient,
    getClientById,
    updateClient,
    deleteClient,
    changeClientPassword
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
    updateClient
);

router.delete(
    '/:id', 
    validatePermission('client:delete'),
    deleteClient
);

export default router;