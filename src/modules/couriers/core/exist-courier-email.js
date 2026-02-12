import { error } from "#helpers";
import { APP_MESSAGES } from "#constants";
import CourierRepository from "#repository/courier";

export const existCourierEmail = async email => {
    const courier = await CourierRepository.findOneByEmail(email);
    if (courier) {
        throw error(APP_MESSAGES.COURIER.EMAIL_ALREADY_EXISTS(email));
     }
};