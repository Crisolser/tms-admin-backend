import { SEEDER_MESSAGES } from '#constants';
import clientWarehouses from '#data/client-warehouses' with { type: 'json' };
import models from '#models';

const { ClientWarehouse, Client } = models;

export const insertWarehouses = async () => {
   console.log(SEEDER_MESSAGES.WAREHOUSES.INSERTING);
   try {
      const existingWarehouses = await ClientWarehouse.findAll();
      if (existingWarehouses.length > 0) {
         console.log(SEEDER_MESSAGES.WAREHOUSES.ALREADY_EXISTS);
         return;
      }
      const firstClient = await Client.findOne();
      for (const warehouse of clientWarehouses) {
         warehouse.client_id = firstClient.id;
      }
      const insertedWarehouses = await ClientWarehouse.bulkCreate(clientWarehouses, {
         returning: true,
      });
      console.log(SEEDER_MESSAGES.WAREHOUSES.INSERTED(insertedWarehouses.length));
   } catch (error) {
      console.log(SEEDER_MESSAGES.WAREHOUSES.ERROR(error));
   }
};

export default insertWarehouses;
