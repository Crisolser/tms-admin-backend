import { SEEDER_MESSAGES } from '#constants';
import roles from '#data/roles' with { type: 'json' };
import models from '#models';

const { Role, Permission } = models;

export const insertRoles = async () => {
   console.log(SEEDER_MESSAGES.ROLES.INSERTING);
   try {
      const existingRoles = await Role.findAll();
      if (existingRoles.length > 0) {
         console.log(SEEDER_MESSAGES.ROLES.ALREADY_EXISTS);
         return;
      }
      const insertedRoles = await Role.bulkCreate(roles, { returning: true });

      const allPermissions = await Permission.findAll();
      const operationPermissions = allPermissions.filter(perm => perm.action === 'read');
      const salePermissions = allPermissions.filter(perm => perm.module === 'client');

      await Promise.all(
         insertedRoles.map(async role => {
            if (role.name === 'Admin') await role.setPermissions(allPermissions);
            if (role.name === 'Operator') await role.setPermissions(operationPermissions);
            if (role.name === 'Sales') await role.setPermissions(salePermissions);
         })
      );

      console.log(SEEDER_MESSAGES.ROLES.INSERTED(insertedRoles.length));
   } catch (error) {
      console.log(SEEDER_MESSAGES.ROLES.ERROR(error));
   }
};

export default insertRoles;
