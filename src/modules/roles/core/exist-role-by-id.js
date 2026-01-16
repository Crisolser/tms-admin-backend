import RoleRepository from '#repository/role';
import { error } from '#helpers';
import { APP_MESSAGES } from '#constants';

export const existRoleById = async (id) => {
    const role = await RoleRepository.findOne( id );
    if (!role) throw error(APP_MESSAGES.ROLE.NOT_FOUND(id));
};