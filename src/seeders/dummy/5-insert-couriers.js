import { SEEDER_MESSAGES } from "#constants";
import couriers from "#data/couriers" with { type: 'json' };
import models from "#models";
import bcrypt from "bcrypt";

const { Courier } = models;

export const insertCouriers = async () => {
    console.log(SEEDER_MESSAGES.COURIERS.INSERTING);
    try {
        const existingCouriers = await Courier.findAll();
        if (existingCouriers.length > 0) {
            console.log(SEEDER_MESSAGES.COURIERS.ALREADY_EXISTS);
            return;
        }
        for (const courier of couriers) {
            courier.password = await bcrypt.hash(courier.password, 10);
        }
        const insertedCouriers = await Courier.bulkCreate(couriers, { returning: true });

        console.log(SEEDER_MESSAGES.COURIERS.INSERTED(insertedCouriers.length));
    } 
    catch (error) {
        console.log(SEEDER_MESSAGES.COURIERS.ERROR(error));
    }
};

export default insertCouriers;