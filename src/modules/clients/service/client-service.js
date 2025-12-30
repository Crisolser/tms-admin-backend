import bcrypt from 'bcrypt';
import { 
    error, 
    comparateChanges
} from '#helpers';
import ClientRepository from '#repository/client';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';
import { existEmailInClient } from '#clientmodule/core/index';
import { apiTokenCreatedDto } from '#clientmodule/interface/index';

const getAll = async filters => {
    const { page, limit, ...filterParameters } = filters;
    const { clients, total } = await ClientRepository.findMany(filters);
    const pages = Math.ceil(total / limit);
    if (page > pages && total > 0) throw error(APP_MESSAGES.ERROR.PAGE_EXCEEDS);
    const clientsData = {
        pagination: {
            total_records: total,
            total_pages: pages,
            current_page: page,
            per_page: limit,
            has_next_page: page < pages,
            has_previous_page: page > 1,
        },
        filters: filterParameters,
        clients,
    };
    return clientsData;
};

const create = async data => {
    const { email, password } = data;
    await existEmailInClient(email);
    data.password = await bcrypt.hash(password, 10);
    const newClient = await ClientRepository.create(data);
    return newClient;
}

const getById = async id => {
    const client = await ClientRepository.findOneById(id);
    if (!client) throw error(APP_MESSAGES.CLIENT.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    return client;
}

const update = async (id, changes) => {
    const client = await ClientRepository.findOneById(id);
    if (!client) throw error(APP_MESSAGES.CLIENT.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    const { newData, oldData } = comparateChanges(changes, client);
    const updatedFields = Object.keys(newData);
    if (updatedFields.includes('email')) await existEmailInClient(newData.email); 
    await ClientRepository.update(id, newData);
    return {
        updated_fields: updatedFields,
        new_data: newData,
        old_data: oldData
    };
}

const softRemove = async id => {
    const client = await ClientRepository.findOneById(id);
    if (!client) throw error(APP_MESSAGES.CLIENT.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    await ClientRepository.softRemove(id);
    return;
}

const changePassword = async (id, newPassword) => {
    const client = await ClientRepository.findOneById(id);
    if (!client) throw error(APP_MESSAGES.CLIENT.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await ClientRepository.update(id, { password: hashedPassword });
    return;
}

const createApiToken = async (id) => {
    const client = await ClientRepository.findOneById(id);
    if (!client) throw error(APP_MESSAGES.CLIENT.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    const token = await ClientRepository.createApiToken(id);
    const apiToken = apiTokenCreatedDto(token);
    return apiToken;
}

const getApiTokens = async (id) => {
    const client = await ClientRepository.findOneById(id);
    if (!client) throw error(APP_MESSAGES.CLIENT.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    const tokens = await ClientRepository.getApiTokens(id);
    return tokens;
}

const updateApiToken = async (params, changes) => {
    const { id, tokenId } = params;
    const client = await ClientRepository.findOneById(id);
    if (!client) throw error(APP_MESSAGES.CLIENT.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    const token = await ClientRepository.findApiTokenById(tokenId);
    if (!token) throw error(APP_MESSAGES.CLIENT.NOT_FOUND(tokenId), {}, HTTP_STATUS.NOT_FOUND);
    if (token.client_id !== id) throw error(APP_MESSAGES.CLIENT.API_TOKEN_NOT_BELONGS_TO_CLIENT(tokenId, id));
    
    const { newData, oldData } = comparateChanges(changes, token);
    const updatedFields = Object.keys(newData);
    await ClientRepository.updateApiToken(tokenId, newData);
    return {
        updated_fields: updatedFields,
        new_data: newData,
        old_data: oldData
    };
}

export default {
    getAll,
    create,
    getById,
    update,
    softRemove,
    changePassword,
    createApiToken,
    getApiTokens,
    updateApiToken
};