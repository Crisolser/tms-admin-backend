import models from '#models';

const { Permission } = models;

const findAll = async () => {
    const permissions = await Permission.findAll();
    return permissions;
};

export default {
    findAll
};