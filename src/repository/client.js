import { Op, fn, col, where as wh} from 'sequelize';
import models from '#models';

const { Client } = models;

const findMany = async (filters) => {
    const { page, limit, id, email, phone, status, name } = filters;
    const offset = (page - 1) * limit;
    const where = {};
    if (id !== undefined) where.id = id;
    if (email !== undefined) where.email = { [Op.iLike]: `%${email}%` };
    if (phone !== undefined) where.phone = { [Op.iLike]: `%${phone}%` };
    if (status !== undefined) where.status = status;
    if (name !== undefined) where[Op.and] = wh(fn('concat', col('name'), col('surname')), { [Op.iLike]: `%${name}%` });
    
    const { rows, count } = await Client.findAndCountAll({
        where,
        attributes: { exclude: ['password', 'deleted_at', 'created_at', 'updated_at', 'profile_photo', 'maternal_surname'] },
        limit,
        offset,
        order: [['id', 'ASC']],
    });
    return {
        clients: rows,
        total: count,
    };
}

export default {
    findMany,
};