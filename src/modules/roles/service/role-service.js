import { 
    error, 
    comparateChanges
} from '#helpers';
import RoleRepository from '#repository/role';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';

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

export default {
    getAll,
};