import { Op } from 'sequelize';
import models from '#models';

const { Courier, Vehicle, Client, ClientWarehouse } = models;

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

const getPackages = async (id,packageStatusIds) => {
    const courier = await Courier.findByPk(id);
    const packages = await courier.getPackages({
        where: {
            package_status_id: {
                [Op.in]: packageStatusIds
            }
        },
        attributes: [
            'id',
            'address',
            'latitude',
            'longitude',
            'internal_id',
            'package_status_id',
            'finished_at'
        ],
        include: [
            {
                model: Client,
                attributes: ['id', 'name'],
                as: 'client'
            },
            {
                model: ClientWarehouse,
                attributes: ['id', 'code', 'description'],
                as: 'warehouse'
            }
        ],
        limit: 200,
        order: [
            ['finished_at', 'DESC'],
            ['id', 'DESC']
        ]
    });
    return packages;
}

export default {
    findMany,
    findOneByEmail,
    findOneByPhone,
    findOneById,
    findVehicleTypeById,
    create,
    update,
    getPackages
};