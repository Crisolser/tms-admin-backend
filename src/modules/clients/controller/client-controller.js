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
        const data = req.body;
        // Implement ClientService.create similar to AdminService.create
        const newClient = 1;
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
        const { id } = req.params;
        // Implement ClientService.getById similar to AdminService.getById
        const client = {};
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
        const { id } = req.params;
        const changes = req.body;
        // Implement ClientService.update similar to AdminService.update
        const updatedClient = {};
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
        const { id } = req.params;
        const message = APP_MESSAGES.CLIENT.DELETED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};

export const changeClientPassword = async (req, res, next) => { 
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        const message = APP_MESSAGES.CLIENT.PASSWORD_CHANGED(id);
        return successHandler(req, res, { message });
    }
    catch (err) {
        return next(err);
    }
};