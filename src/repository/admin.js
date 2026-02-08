import sequelize from '#config/sequelize';
import { Op } from 'sequelize';
import models from '#models';

const { Admin } = models;

const findMany = async filters => {
   const { page, limit, id, email, phone, status } = filters;
   const offset = (page - 1) * limit;
   const where = {};

   if (id !== undefined) where.id = id;
   if (email !== undefined) where.email = { [Op.iLike]: `%${email}%` };
   if (phone !== undefined) where.phone = { [Op.iLike]: `%${phone}%` };
   if (status !== undefined) where.status = status;

   const { rows, count } = await Admin.findAndCountAll({
      where,
      attributes: {
         exclude: [
            'password',
            'deleted_at',
            'created_at',
            'updated_at',
            'profile_photo',
            'maternal_surname',
         ],
      },
      limit,
      offset,
      order: [['id', 'ASC']],
   });

   return {
      admins: rows,
      total: count,
   };
};

const findOneById = async id => {
   return await Admin.findByPk(id, {
      attributes: { exclude: ['password', 'deleted_at'] },
   });
};

const findOneByEmail = async email => {
   return await Admin.findOne({
      where: { email },
      attributes: { exclude: ['deleted_at'] },
   });
};

const create = async data => {
   const { id } = await Admin.create(data);
   return id;
};

const update = async (id, data) => {
   await Admin.update(data, { where: { id } });
   return;
};

const softRemove = async id => {
   const admin = await Admin.findByPk(id);
   await admin.destroy();
   return;
};

const getRoles = async id => {
   const admin = await Admin.findByPk(id);
   if (!admin) return [];
   const roles = await admin.getRoles({
      attributes: ['id', 'name', 'description'],
      where: { is_active: true },
      joinTableAttributes: [],
   });
   return roles;
};

const addRoles = async (id, roles) => {
   const admin = await Admin.findByPk(id);
   await admin.addRoles(roles);
   return;
};

const removeRoles = async (id, roles) => {
   const admin = await Admin.findByPk(id);
   await admin.removeRoles(roles);
   return;
};

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
};

export default {
   findMany,
   findOneById,
   findOneByEmail,
   create,
   update,
   softRemove,
   getRoles,
   addRoles,
   removeRoles,
   getPermissions,
};
