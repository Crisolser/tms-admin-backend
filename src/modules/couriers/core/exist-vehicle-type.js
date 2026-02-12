import { error } from "#helpers";
import { APP_MESSAGES } from "#constants";
import CourierRepository from "#repository/courier";

export const existVehicleType = async vehicleTypeId => {
    const vehicleType = await CourierRepository.findVehicleTypeById(vehicleTypeId);
    if (!vehicleType) {
        throw error(APP_MESSAGES.VEHICLE_TYPE.NOT_FOUND(vehicleTypeId));
    }
};