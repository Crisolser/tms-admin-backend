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

export default {
    getAll,
    create,
};