import sequelize from './sequelize.js';
import '#models';
import { LOG_MESSAGES } from '#constants';

const syncDatabase = async () => {
   try {
      await sequelize.sync();
      console.log(LOG_MESSAGES.DB_SYNC_SUCCESS);
   } catch (error) {
      console.error(LOG_MESSAGES.DB_SYNC_ERROR(error));
      process.exit(1);
   }
};

export default syncDatabase;
