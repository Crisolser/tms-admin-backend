import bcrypt from 'bcrypt';
import { error } from '#helpers';
import { APP_MESSAGES } from '#constants';
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
import { COURIER_PACKAGE_TYPES_STATUS } from '#enums';

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

const getById = id => {
   const courier = existCourier(id);
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

export default {
   getAll,
   create,
   getById,
   update,
   changePassword,
   changeStatus,
   getCourierPackages
};