import { successHandler } from '#helpers';
import { APP_MESSAGES } from '#constants';
import ClientService from '#clientmodule/service/client-service';

export const getClients = async (req, res, next) => {
    try {
        const filters = req.validated.query;
        const clients = await ClientService.getAll(filters);
        const message = APP_MESSAGES.CLIENT.GET_LIST;
        const additionalData = { ...clients };
        return successHandler(req, res, { message, additionalData });
    } 
    catch (err) {
        return next(err);
    }
};

export const createClient = async (req, res, next) => {
    try {
        const data = req.validated.body;
        const newClient = await ClientService.create(data);
        const message = APP_MESSAGES.CLIENT.CREATED;
        const additionalData = { client_id: newClient };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const getClientById = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        const client = await ClientService.getById(id);
        const message = APP_MESSAGES.CLIENT.GET_ONE(id);
        const additionalData = { client };
        return successHandler(req, res, { message, additionalData });
    }  
    catch (err) {
        return next(err);
    }
};

export const updateClient = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        const changes = req.validated.body;
        const updatedClient = await ClientService.update(id, changes);
        const message = APP_MESSAGES.CLIENT.UPDATED(id);
        const additionalData = { ...updatedClient };
        return successHandler(req, res, { message, additionalData });
    }
    catch (err) {
        return next(err);
    }
};

export const deleteClient = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        await ClientService.softRemove(id);
        const message = APP_MESSAGES.CLIENT.DELETED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};

export const changeClientPassword = async (req, res, next) => { 
    try {
        const { id } = req.validated.params;
        const { password } = req.validated.body;
        await ClientService.changePassword(id, password);
        const message = APP_MESSAGES.CLIENT.PASSWORD_CHANGED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};