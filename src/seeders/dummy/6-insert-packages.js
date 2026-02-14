import { SEEDER_MESSAGES } from '#constants';
import packages from '#data/packages' with { type: 'json' };
import models from '#models';

const { Package } = models;

export const insertPackages = async () => {
   console.log(SEEDER_MESSAGES.PACKAGES.INSERTING);
   try {
      const existingPackages = await Package.findAll();
      if (existingPackages.length > 0) {
         console.log(SEEDER_MESSAGES.PACKAGES.ALREADY_EXISTS);
         return;
      }
      const insertedPackages = await Package.bulkCreate(packages, { returning: true });

      console.log(SEEDER_MESSAGES.PACKAGES.INSERTED(insertedPackages.length));
   } catch (error) {
      console.log(SEEDER_MESSAGES.PACKAGES.ERROR(error));
   }
};