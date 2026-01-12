import models from '#models';
import { Op } from 'sequelize';

const { Role } = models;

const findAll = async () => {
    return await Role.findAll({
        where: { is_active: true }
    });
};

const findMany = async (filters) => {
    const { page, limit, name, id } = filters;
    const offset = (page - 1) * limit;
    const where = {};
    if (id !== undefined) where.id = id;
    if (name !== undefined) where.name = { [Op.iLike]: `%${name}%` };
    const { rows, count } = await Role.findAndCountAll({
        where,
        limit,
        offset,
        attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        order: [['id', 'ASC']],
    });
    return {
        roles: rows,
        total: count,
    };
}

export default {
    findAll,
    findMany,
};