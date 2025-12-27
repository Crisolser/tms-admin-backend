import bcrypt from 'bcrypt';
import { 
    error, 
    comparateChanges, 
    comparateAsossiations,
    findInvalidAssociations 
} from '#helpers';
import AdminRepository from '#repository/admin';
import RoleRepository from '#repository/role';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';
import { existEmailInAdmin } from '#adminsmodule/core/index';

const getAll = async filters => {
    const { page, limit, ...filterParameters } = filters;
    const { admins, total } = await AdminRepository.findMany(filters);
    const pages = Math.ceil(total / limit);
    if(page > pages && total > 0) throw error(APP_MESSAGES.ERROR.PAGE_EXCEEDS);
    const adminsData = {
        pagination: {
            total_records: total,
            total_pages: pages,
            current_page: page,
            per_page: limit,
            has_next_page: page < pages,
            has_previous_page: page > 1,
        },
        filters: filterParameters,
        admins,
    }
    return adminsData;
}

const create = async data => {
    const { email, password } = data;
    const existingAdmin = await AdminRepository.findOneByEmail(email);
    if (existingAdmin) throw error(APP_MESSAGES.ERROR.EMAIL_IN_USE(email));
    data.password = await bcrypt.hash(password, 10);
    const newAdmin = await AdminRepository.create(data);
    return newAdmin;
};

const getById = async id => {
    const admin = await AdminRepository.findOneById(id);
    if (!admin) throw error(APP_MESSAGES.ADMIN.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    return admin;
}

const update = async (id, changes) => {
    const admin = await AdminRepository.findOneById(id);
    if (!admin) throw error(APP_MESSAGES.ADMIN.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    const { newData, oldData } = comparateChanges(changes, admin);
    const updatedFields = Object.keys(newData);
    if (updatedFields.includes('email')) existEmailInAdmin(newData.email);

    await AdminRepository.update(id, newData);
    return {
        updated_fields: updatedFields,
        new_data: newData,
        old_data: oldData
    };
}

const remove = async id => {
    const admin = await AdminRepository.findOneById(id);
    if (!admin) throw error(APP_MESSAGES.ADMIN.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    await AdminRepository.softRemove(id);
}

const changePassword = async (id, newPassword) => {
    const admin = await AdminRepository.findOneById(id);
    if (!admin) throw error(APP_MESSAGES.ADMIN.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    const password = await bcrypt.hash(newPassword, 10);
    await AdminRepository.update(id, { password });
}

const getRoles = async id => {
    const admin = await AdminRepository.findOneById(id);
    if (!admin) throw error(APP_MESSAGES.ADMIN.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    let roles = await RoleRepository.findAll()
    let adminRoles =  await AdminRepository.getRoles(id);
    let adminRolesIds = adminRoles.map(role => role.id);
    roles = roles.map(role => {
        const roleJson = role.toJSON();
        const {created_at, updated_at,is_active, ...roleData} = roleJson;
        return {
            ...roleData,
            is_active_in_admin: adminRolesIds.includes(role.id)
        }
    });
    return roles;
}

const updateRoles = async (id, roles) => {
    const admin = await AdminRepository.findOneById(id);
    if (!admin) throw error(APP_MESSAGES.ADMIN.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
    const allRoles = await RoleRepository.findAll();
    findInvalidAssociations(roles, allRoles);
    const actualAdminRoles = await AdminRepository.getRoles(id);
    const { createData, deleteData } = comparateAsossiations(roles, actualAdminRoles, 'is_active_in_admin');
    await AdminRepository.addRoles(id, createData);
    await AdminRepository.removeRoles(id, deleteData);

    const rolesUpdated = {
        added_roles: createData,
        removed_roles: deleteData
    };
    return rolesUpdated;
}

export default {
    getAll,
    create,
    getById,
    update,
    remove,
    changePassword,
    getRoles,
    updateRoles
};