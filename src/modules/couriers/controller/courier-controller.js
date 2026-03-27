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

export const getCourierPackages = async (req, res, next) => {
   try {
        const { courierId, type } = req.validated.params;
        const packages = await CourierService.getCourierPackages(courierId, type);
        const message = APP_MESSAGES.COURIER.GET_PACKAGES;
        const additionalData = { type, packages };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const createUrlForProfilePhoto = async (req, res, next) => {
   try {
        const { courierId } = req.validated.params;
        const data = req.validated.body;
        const urlData = await CourierService.createUrlForProfilePhoto(courierId, data);
        const message = APP_MESSAGES.COURIER.PROFILE_PHOTO_URL_CREATED(courierId);
        const additionalData = { ...urlData };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const confirmProfilePhotoUpload = async (req, res, next) => {
   try {
        const { courierId } = req.validated.params;
        const { file_name } = req.validated.body;
        const fileUrl = await CourierService.confirmProfilePhotoUpload(courierId, file_name);
        const message = APP_MESSAGES.COURIER.PROFILE_PHOTO_UPDATED(courierId);
        const additionalData = { profile_photo_url: fileUrl };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const createUrlForDocument = async (req, res, next) => {
   try {
        const { courierId } = req.validated.params;
        const data = req.validated.body;
        const documentUrl = await CourierService.createUrlForDocument(courierId, data);
        const message = APP_MESSAGES.COURIER.DOCUMENT_URL_CREATED(courierId);
        const additionalData = { ...documentUrl };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const confirmDocumentUpload = async (req, res, next) => {
   try {
        const { courierId } = req.validated.params;
        const { file_name, document_type } = req.validated.body;
        const fileUrl = await CourierService.confirmDocumentUpload(courierId, file_name, document_type);
        const message = APP_MESSAGES.COURIER.DOCUMENT_UPDATED(courierId, document_type);
        const additionalData = { document_url: fileUrl };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};

export const getCourierDocuments = async (req, res, next) => {
   try {
        const { courierId } = req.validated.params;
        const documents = await CourierService.getCourierDocuments(courierId);
        const message = APP_MESSAGES.COURIER.GET_DOCUMENTS(courierId);
        const additionalData = { documents };
        return successHandler(req, res, { message, additionalData });
   } catch (err) {
      return next(err);
   }
};