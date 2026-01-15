import { 
    error, 
    comparateChanges
} from '#helpers';
import RoleRepository from '#repository/role';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';
import { existRoleByName } from '#rolesmodule/core/index';

const getAll = async filters => {
    const { page, limit, ...filterParameters } = filters;
    const { roles, total } = await RoleRepository.findMany(filters);
    const pages = Math.ceil(total / limit);
    if (page > pages && total > 0) throw error(APP_MESSAGES.ERROR.PAGE_EXCEEDS);
    const rolesData = {
        pagination: {
            total_records: total,
            total_pages: pages,
            current_page: page,
            per_page: limit,
            has_next_page: page < pages,
            has_previous_page: page > 1,
        },
        filters: filterParameters,
        roles: roles
    };
    return rolesData;
};

const create = async data => {
    await existRoleByName(data.name);
    const newRole = await RoleRepository.create(data);
    return newRole;
}

const getById = async id => {
    const role = await RoleRepository.findOne( id );
    if (!role) throw error(APP_MESSAGES.ROLE.NOT_FOUND(id), HTTP_STATUS.NOT_FOUND);
    return role;
}

const update = async (id, changes) => {
    const role = await RoleRepository.findOne( id );
    if (!role) throw error(APP_MESSAGES.ROLE.NOT_FOUND(id), HTTP_STATUS.NOT_FOUND);
    const { newData, oldData } = comparateChanges(changes, role);
    if (newData.name) await existRoleByName(newData.name, id);
    await RoleRepository.update(id, newData);
    const updatedFields = Object.keys(newData);
    return {
        updated_fields: updatedFields,
        new_data: newData,
        old_data: oldData
    };
}

const remove = async id => {
    const role = await RoleRepository.findOne( id );
    if (!role) throw error(APP_MESSAGES.ROLE.NOT_FOUND(id), HTTP_STATUS.NOT_FOUND);
    await RoleRepository.remove(id);
    return;
}


export default {
    getAll,
    create,
    getById,
    update,
    remove
};