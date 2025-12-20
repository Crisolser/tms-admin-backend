import app from '#app';
import sequelize from '#config/sequelize';
import env from '#config/env';
import { LOG_MESSAGES } from '#constants';

const { PORT, NODE_ENV } = env;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(LOG_MESSAGES.DB_CONNECTED);
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