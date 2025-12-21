import app from '#app';
import sequelize from '#config/sequelize';
import env from '#config/env';
import syncDatabase from '#config/sync';
import insertCatalogs from '#config/insert-catalogs';
import insertDummyData from '#config/insert-dummy';
import { LOG_MESSAGES } from '#constants';

const { PORT, NODE_ENV } = env;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(LOG_MESSAGES.DB_CONNECTED);
        await syncDatabase();
        await insertCatalogs();
        if (NODE_ENV === 'local') {
            console.log(LOG_MESSAGES.SERVER_LOCAL_MODE);
            await insertDummyData();
        }
        app.listen(PORT, () => {
            console.log(LOG_MESSAGES.SERVER_STARTED(PORT));
        });
    }  
    catch (error) {
        console.error(LOG_MESSAGES.SERVER_START_ERROR(error));
        process.exit(1);
    }
};

startServer();