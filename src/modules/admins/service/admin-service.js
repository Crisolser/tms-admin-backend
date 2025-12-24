import bcrypt from 'bcrypt';
import { error } from '#helpers';
import AdminRepository from '#repository/admin';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';

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

export default {
    getAll,
    create,
    getById,
};