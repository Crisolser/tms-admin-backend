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
};

const findOne = async (id) => {
    return await Role.findOne({ where: { id } });
};

const findOneByName = async name => {
    return await Role.findOne({ where: { name } });
};

const create = async data => {
    const { id } = await Role.create(data);
    return id;
};

const update = async (id, changes) => {
    await Role.update(changes, { where: { id } });
};

const remove = async id => {
    const role = await Role.findOne({ where: { id } });
    await role.destroy();
};

export default {
    findAll,
    findMany,
    findOne,
    findOneByName,
    create,
    update,
    remove
};