import { Sequelize } from "sequelize";
import env from "./env.js";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } = env;

const sequelize = new Sequelize(
    DATABASE,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
        logging: false,
    }
);

export default sequelize;