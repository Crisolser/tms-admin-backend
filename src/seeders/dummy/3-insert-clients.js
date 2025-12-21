import { SEEDER_MESSAGES } from "#constants";
import clients from "#data/clients" with { type: 'json' };
import models from "#models";
import bcrypt from "bcrypt";

const { Client } = models;

export const insertClients = async () => {
    console.log(SEEDER_MESSAGES.CLIENTS.INSERTING);
    try {
        const existingClients = await Client.findAll();
        if (existingClients.length > 0) {
            console.log(SEEDER_MESSAGES.CLIENTS.ALREADY_EXISTS);
            return;
        }
        for (const client of clients) {
            client.password = await bcrypt.hash(client.password, 10);
        }
        const insertedClients = await Client.bulkCreate(clients, { returning: true });

        console.log(SEEDER_MESSAGES.CLIENTS.INSERTED(insertedClients.length));
    } catch (error) {
        console.log(SEEDER_MESSAGES.CLIENTS.ERROR(error));
    }
};

export default insertClients;