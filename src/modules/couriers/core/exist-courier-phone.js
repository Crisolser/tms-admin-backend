import { error } from "#helpers";
import { APP_MESSAGES } from "#constants";
import CourierRepository from "#repository/courier";

export const existCourierPhone = async phone => {
    const courier = await CourierRepository.findOneByPhone(phone);
    if (courier) {
        throw error(APP_MESSAGES.COURIER.PHONE_ALREADY_EXISTS(phone));
    }
};