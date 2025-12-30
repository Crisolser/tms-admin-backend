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

const findOneById = async id => {
    return await Client.findByPk(id, {
        attributes: { exclude: ['password', 'deleted_at'] },
    });
};

const findOneByEmail = async email => {
    return await Client.findOne({ 
        where: { email },
        attributes: { exclude: ['deleted_at'] }, 
    });
};

const create = async data => {
    const { id } = await Client.create(data);
    return id;
}

const update = async (id, data) => {
    await Client.update(data, { where: { id } });
    return;
}

export default {
    findMany,
    findOneById,
    findOneByEmail,
    create,
    update,
};