import { SEEDER_MESSAGES } from '#constants';
import {
   insertRoles,
   insertAdmins,
   insertClients,
   insertWarehouses,
   insertCouriers,
} from '#dummy-data';

const insertDummyData = async () => {
   console.log(SEEDER_MESSAGES.GENERAL.STARTING_DUMMY_DATA);
   await insertRoles();
   await insertAdmins();
   await insertClients();
   await insertWarehouses();
   await insertCouriers();
};

export default insertDummyData;
