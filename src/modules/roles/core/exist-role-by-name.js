import RoleRepository from '#repository/role';
import { error } from '#helpers';
import { APP_MESSAGES } from '#constants';

export const existRoleByName = async (name) => {
    const role = await RoleRepository.findOneByName(name);
    if (role) throw error(APP_MESSAGES.ROLE.ALREADY_EXISTS(name));
};