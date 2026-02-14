import { error } from "#helpers";
import { APP_MESSAGES } from "#constants";
import CourierRepository from "#repository/courier";

export const existCourier = async id => {
    const courier = await CourierRepository.findOneById(id);
    if (!courier) {
        throw error(APP_MESSAGES.COURIER.NOT_FOUND(id));
     }
     return courier;
};