import { SEEDER_MESSAGES } from '#constants';
import {
   insertPermissions,
   insertVehicles,
   insertPackageStatus,
   insertDocumentTypes,
} from '#catalogs-data';

const insertCatalogs = async () => {
   console.log(SEEDER_MESSAGES.GENERAL.STARTING);
   await insertPermissions();
   await insertVehicles();
   await insertPackageStatus();
   await insertDocumentTypes();
};

export default insertCatalogs;
