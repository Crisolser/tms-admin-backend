import models from '#models';

const { Role } = models;

const findAll = async () => {
    return await Role.findAll({
        where: { is_active: true }
    });
};

export default {
    findAll,
};