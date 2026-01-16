import { 
    error, 
    comparateChanges
} from '#helpers';
import RoleRepository from '#repository/role';
import PermissionRepository from '#repository/permission';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';
import { existRoleByName, existRoleById } from '#rolesmodule/core/index';

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
};

const getById = async id => {
    const role = await RoleRepository.findOne( id );
    if (!role) throw error(APP_MESSAGES.ROLE.NOT_FOUND(id), HTTP_STATUS.NOT_FOUND);
    return role;
};

const update = async (id, changes) => {
    const role = await RoleRepository.findOne( id );
    if (!role) throw error(APP_MESSAGES.ROLE.NOT_FOUND(id), HTTP_STATUS.NOT_FOUND);
    const { newData, oldData } = comparateChanges(changes, role);
    if (newData.name) await existRoleByName(newData.name);
    await RoleRepository.update(id, newData);
    const updatedFields = Object.keys(newData);
    return {
        updated_fields: updatedFields,
        new_data: newData,
        old_data: oldData
    };
};

const remove = async id => {
    await existRoleById(id);
    await RoleRepository.remove(id);
    return;
};

const getPermissions = async id => {
    await existRoleById(id);
    const permissions = await PermissionRepository.findAll();
    const rolePermissions = await RoleRepository.getPermissions(id);
    const rolePermissionIds = rolePermissions.map(perm => perm.id);
    const permissionsData = permissions.map(perm => ({
        id: perm.id,
        code: perm.code,
        action: perm.action,
        module: perm.module,
        description: perm.description,
        is_active_in_role: rolePermissionIds.includes(perm.id)
    }));
    return permissionsData;
};

const updatePermissions = async (id, permissions) => {
    await existRoleById(id);
    const permissionsIds = permissions.map(perm => perm.id);
    const allPermissions = await PermissionRepository.findAll();
    const allPermissionsIds = allPermissions.map(perm => perm.id);
    const invalidPermissions = permissions.filter(perm => !allPermissionsIds.includes(perm.id));
    if (invalidPermissions.length > 0) throw error(APP_MESSAGES.ROLE.INVALID_PERMISSIONS,{ invalid_permissions: invalidPermissions });
    const validPermissions = allPermissions.filter(perm => permissionsIds.includes(perm.id));
    const rolePermissions = await RoleRepository.getPermissions(id);
    const rolePermissionIds = rolePermissions.map(perm => perm.id);
    const toAdd = validPermissions.filter(perm => !rolePermissionIds.includes(perm.id));
    const toRemove = rolePermissions.filter(perm => !permissionsIds.includes(perm.id));
    const toAddIds = toAdd.map(perm => perm.id);
    const toRemoveIds = toRemove.map(perm => perm.id);
    const toAddCodes = toAdd.map(perm => perm.code);
    const toRemoveCodes = toRemove.map(perm => perm.code);

    if (toAdd.length > 0) await RoleRepository.addPermissions(id, toAddIds);
    if (toRemove.length > 0) await RoleRepository.removePermissions(id, toRemoveIds);
    
    return{
        added: toAddCodes,
        removed: toRemoveCodes
    };
};


export default {
    getAll,
    create,
    getById,
    update,
    remove,
    getPermissions,
    updatePermissions
};