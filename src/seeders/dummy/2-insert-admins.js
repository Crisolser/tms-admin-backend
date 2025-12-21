import { SEEDER_MESSAGES } from "#constants";
import admins from "#data/admins" with { type: 'json' };
import models from "#models";
import bcrypt from "bcrypt";

const { Admin, Role } = models;

export const insertAdmins = async () => {
    console.log(SEEDER_MESSAGES.ADMINS.INSERTING);
    try {
        const existingAdmins = await Admin.findAll();
        if (existingAdmins.length > 0) {
            console.log(SEEDER_MESSAGES.ADMINS.ALREADY_EXISTS);
            return;
        }

        for (const admin of admins) {
            admin.password = await bcrypt.hash(admin.password, 10);
        }

        const insertedAdmins = await Admin.bulkCreate(admins, { returning: true });
        const allRoles = await Role.findAll();
        const adminRole = allRoles.find(role => role.name === 'Admin');
        const operatorRole = allRoles.find(role => role.name === 'Operator');
        const salesRole = allRoles.find(role => role.name === 'Sales');
        insertedAdmins.forEach(async (admin) => {
            if (admin.email === 'admin@gmail.com') await admin.addRole(adminRole);
            if (admin.email === 'operator@gmail.com') await admin.addRole(operatorRole);
            if (admin.email === 'sales@gmail.com') await admin.addRole(salesRole);
        });

        console.log(SEEDER_MESSAGES.ADMINS.INSERTED(insertedAdmins.length));
    } catch (error) {
        console.log(error);
        console.log(SEEDER_MESSAGES.ADMINS.ERROR(error));
    }
};

export default insertAdmins;