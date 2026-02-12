import { successHandler } from '#helpers';
import { APP_MESSAGES } from '#constants';
import CourierService from '#couriersmodule/service/courier-service';

export const getCouriers = async (req, res, next) => {
   try {
      const filters = req.validated.query;
      const couriers = await CourierService.getAll(filters);
      const message = APP_MESSAGES.COURIER.GET_LIST;
      const additionalData = { ...couriers };
      return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};
export const createCourier = async (req, res, next) => {
   try {
      const data = req.validated.body;
      const newCourier = await CourierService.create(data);
      const message = APP_MESSAGES.COURIER.CREATED;
      const additionalData = { courier_id: newCourier };
      return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const getCourier = async (req, res, next) => {
   try {
        const { courierId } = req.validated.params;
        const courier = await CourierService.getById(courierId);
        const message = APP_MESSAGES.COURIER.GET_ONE(courierId);
        const additionalData = { courier };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const updateCourier = async (req, res, next) => {
   try {
        const { courierId } = req.validated.params;
        const data = req.validated.body;
        const updatedCourier = await CourierService.update(courierId, data);
        const message = APP_MESSAGES.COURIER.UPDATED(courierId);
        const additionalData = { ...updatedCourier };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const changeCourierStatus = async (req, res, next) => {
   try {
        const { courierId, statusId } = req.validated.params;
        await CourierService.changeStatus(courierId, statusId);
        const message = APP_MESSAGES.COURIER.STATUS_CHANGED(courierId, statusId);
        return successHandler(req, res, { message });
   } catch (err) {
      return next(err);
   }
};

export const changeCourierPassword = async (req, res, next) => {
   try {
        const { courierId } = req.validated.params;
        const { password } = req.validated.body;
        await CourierService.changePassword(courierId, password);
        const message = APP_MESSAGES.COURIER.PASSWORD_CHANGED(courierId);
        return successHandler(req, res, { message });
   } catch (err) {
      return next(err);
   }
};

export const getCourierPackages = (req, res, next) => {
   try {
        const { courierId, type } = req.params;
        // Placeholder implementation, replace with actual service call
        const packages = [];
        const message = APP_MESSAGES.COURIER.GET_PACKAGES;
        const additionalData = { courierId, type, packages };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};