import bcrypt from 'bcrypt';
import { 
    error, 
    comparateChanges, 
    comparateAssociations,
    findInvalidAssociations 
} from '#helpers';
import ClientRepository from '#repository/client';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';
import { existEmailInClient } from '#clientmodule/core/index';

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

export default {
    getAll,
    create,
    getById,
    update,
};