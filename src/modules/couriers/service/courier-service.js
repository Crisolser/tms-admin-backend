import bcrypt from 'bcrypt';
import { error } from '#helpers';
import { APP_MESSAGES, S3_FOLDERS } from '#constants';
import { createPagination } from '#helpers';
import CourierRepository from '#repository/courier'
import {
   existCourierEmail,
   existCourierPhone,
   existVehicleType,
   existCourier
} from '#couriersmodule/core/index';
import {
   comparateChanges
} from '#helpers';
import S3Integration from '#integrations/aws-s3/index';
import { COURIER_PACKAGE_TYPES_STATUS } from '#enums';

const { COURIER_PROFILE_PHOTOS } = S3_FOLDERS;

const getAll = async query => {
   const { limit, page, ...filters } = query 
   const { couriers, total } = await CourierRepository.findMany(query);
   const totalPages = Math.ceil(total / limit);
   const pagination = createPagination(limit, page, totalPages, total); 
   return {
      pagination,
      filters,
      couriers
   };
};

const create = async data => {
   const { email, phone, vehicle_id, password } = data;
   await existCourierEmail(email);
   await existCourierPhone(phone);
   await existVehicleType(vehicle_id);
   const hashedPassword = await bcrypt.hash(password, 10);
   const courierId = await CourierRepository.create({ ...data, password: hashedPassword });
   return courierId;
};

const getById = async id => {
   const courier = await existCourier(id);
   const { profile_photo } = courier.toJSON();
   if(profile_photo) {
      const filePath = `${COURIER_PROFILE_PHOTOS}/${profile_photo}`;
      courier.profile_photo = await S3Integration.getFileUrl(filePath);
   }
   return courier;
};

const update = async (id, changes) => {
   const actualCourier = await existCourier(id);
   const { newData, oldData } = comparateChanges(changes, actualCourier.toJSON());
   const { email, phone, vehicle_id } = newData;
   if(email) await existCourierEmail(email);
   if(phone) await existCourierPhone(phone);
   if(vehicle_id) await existVehicleType(vehicle_id);
   const updatedFields = Object.keys(newData);
   await CourierRepository.update(id, newData);
   return {
      updated_fields: updatedFields,
      old_values: oldData,
      new_values: newData
   };
};

const changePassword = async (id, newPassword) => {
   await existCourier(id);
   const passwordHash = await bcrypt.hash(newPassword, 10);
   await CourierRepository.update(id, { password: passwordHash });
   return;
};

const changeStatus = async (id, newStatus) => {
   const courier = await existCourier(id);
   const { status } = courier.toJSON();
   if (status === newStatus) {
      throw error(APP_MESSAGES.COURIER.STATUS_ALREADY_SET(id, newStatus));
   }
   await CourierRepository.update(id, { status: newStatus });
   return;
};

const getCourierPackages = async (courierId, type) => {
   await existCourier(courierId);
   const packageStatusIds = COURIER_PACKAGE_TYPES_STATUS[type.toUpperCase()];
   const packages = await CourierRepository.getPackages(courierId, packageStatusIds);
   return packages;
}

const createUrlForProfilePhoto = async (courierId, data) => {
   await existCourier(courierId);
   const { mime_type } = data;
   const type = mime_type.split('/')[1];
   const now = Date.now();
   const dateUnix = Math.floor(now / 1000);
   const fileName = `${courierId}-${dateUnix}.${type}`;
   const fullPath = `${COURIER_PROFILE_PHOTOS}/${fileName}`;
   const url = await S3Integration.getSignedUrlForUpdate(fullPath, mime_type);
   return { url, file_name: fileName, mime_type };
};

const confirmProfilePhotoUpload = async (courierId, fileName) => {
   const courier = await existCourier(courierId);
   const { profile_photo } = courier.toJSON();
   const actualFilePath = `${COURIER_PROFILE_PHOTOS}/${profile_photo}`;
   const fullPath = `${COURIER_PROFILE_PHOTOS}/${fileName}`;
   if(profile_photo) await S3Integration.deleteFile(actualFilePath);
   await S3Integration.existFile(fullPath);
   const fileUrl = await S3Integration.getFileUrl(fullPath);
   await CourierRepository.update(courierId, { profile_photo: fileName });
   return fileUrl;
};

export default {
   getAll,
   create,
   getById,
   update,
   changePassword,
   changeStatus,
   getCourierPackages,
   createUrlForProfilePhoto,
   confirmProfilePhotoUpload
};