import sequelize from '#config/sequelize';
import models from '#models';

const { Admin } = models;

const findOneById = async id => {
    return await Admin.findByPk(id);
}

const findOneByEmail = async email => {
    return await Admin.findOne({ where: { email } });
}

const getRoles = async id => {
    const admin = await Admin.findByPk(id);
    const roles = await admin.getRoles();
    return roles;
}

const getPermissions = async id => {
    const query = `
    SELECT 
        p.id,
        p.code 
    FROM 
        admin a
        left join 
        admin_role ar on a.id=ar.admin_id 
        left join 
        "role" r on ar.role_id = r.id 
        left join 
        role_permission rp on r.id = rp.role_id 
        left join 
        "permission" p on rp.permission_id = p.id
    WHERE 
        a.id=:id
    `;
    const permissions = await sequelize.query(query, {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
    });
    const uniquePermissions = [...new Set(permissions.map(p => p.code))];

    return uniquePermissions;
}

export default {
    findOneById,
    findOneByEmail,
    getRoles,
    getPermissions,
};