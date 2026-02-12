import { Op } from 'sequelize';
import models from '#models';

const { Courier, Vehicle } = models;

const findMany = async filters => {
    const { page, limit, id, email, phone, status } = filters;
    const offset = (page - 1) * limit;
    const where = {};
    if (id !== undefined) where.id = id;
    if (email !== undefined) where.email = { [Op.iLike]: `%${email}%` };
    if (phone !== undefined) where.phone = { [Op.iLike]: `%${phone}%` };
    if (status !== undefined) where.status = status;
    const { rows, count } = await Courier.findAndCountAll({
        where,
        attributes: {
            exclude: [
                'password',
                'deleted_at',
                'created_at',
                'updated_at'
            ],
        },
        limit,
        offset,
        order: [['id', 'ASC']],
    });
    return {
        couriers: rows,
        total: count
    };
};

const findOneByEmail = async email => {
    return await Courier.findOne({
        where: { email },
        attributes: {
            exclude: [
                'password',
                'deleted_at',
                'created_at',
                'updated_at'
            ],
        },
    });
};

const findOneByPhone = async phone => {
    return await Courier.findOne({
        where: { phone },
        attributes: {
            exclude: [
                'password',
                'deleted_at',
                'created_at',
                'updated_at'
            ],
        },
    });
};

const findOneById = async id => {
    const courier = await Courier.findOne({
        where: { id },
        attributes: {
            exclude: [
                'password',
                'deleted_at',
                'created_at',
                'updated_at'
            ],
        },
    });
    return courier;
}

const findVehicleTypeById = async id => {
    const vehicle = await Vehicle.findOne({
        where: { id }
    });
    return vehicle 
}

const create = async data => {
    const { id } = await Courier.create(data);
    return id;
};

const update = async (id, changes) => {
    await Courier.update(changes, { where: { id } });
};


export default {
    findMany,
    findOneByEmail,
    findOneByPhone,
    findOneById,
    findVehicleTypeById,
    create,
    update
};