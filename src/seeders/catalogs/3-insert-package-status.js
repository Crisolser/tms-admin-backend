import { SEEDER_MESSAGES } from "#constants";
import packageStatus from "#data/package-status" with { type: 'json' };
import models from "#models";

const { PackageStatus } = models;

export const insertPackageStatus = async () => {
    console.log(SEEDER_MESSAGES.PACKAGE_STATUS.INSERTING);
    try {
        const existingStatuses = await PackageStatus.findAll();
        if (existingStatuses.length > 0) {
            console.log(SEEDER_MESSAGES.PACKAGE_STATUS.ALREADY_EXISTS);
            return;
        }
        const insertedStatuses = await PackageStatus.bulkCreate(packageStatus);
        console.log(SEEDER_MESSAGES.PACKAGE_STATUS.INSERTED(insertedStatuses.length));
    } catch (error) {
        console.log(SEEDER_MESSAGES.PACKAGE_STATUS.ERROR(error));
    }
}