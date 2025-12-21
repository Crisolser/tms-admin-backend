import { SEEDER_MESSAGES } from "#constants";
import permissions from "#data/permissions" with { type: 'json' };
import models from "#models";

const { Permission } = models;

export const insertPermissions = async () => {
    console.log(SEEDER_MESSAGES.PERMISSIONS.INSERTING);
    try {
        const existingPermissions = await Permission.findAll();
        if (existingPermissions.length > 0) {
            console.log(SEEDER_MESSAGES.PERMISSIONS.ALREADY_EXISTS);
            return;
        }
        const insertedPermissions = await Permission.bulkCreate(permissions);
        console.log(SEEDER_MESSAGES.PERMISSIONS.INSERTED(insertedPermissions.length));
    } catch (error) {
        console.log(SEEDER_MESSAGES.PERMISSIONS.ERROR(error));
    }
}