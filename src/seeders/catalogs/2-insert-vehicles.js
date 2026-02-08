import { SEEDER_MESSAGES } from '#constants';
import vehicles from '#data/vehicles' with { type: 'json' };
import models from '#models';

const { Vehicle } = models;

export const insertVehicles = async () => {
   console.log(SEEDER_MESSAGES.VEHICLES.INSERTING);
   try {
      const existingVehicles = await Vehicle.findAll();
      if (existingVehicles.length > 0) {
         console.log(SEEDER_MESSAGES.VEHICLES.ALREADY_EXISTS);
         return;
      }
      const insertedVehicles = await Vehicle.bulkCreate(vehicles);
      console.log(SEEDER_MESSAGES.VEHICLES.INSERTED(insertedVehicles.length));
   } catch (error) {
      console.log(SEEDER_MESSAGES.VEHICLES.ERROR(error));
   }
};
