import bcrypt from 'bcrypt';
import { error } from '#helpers';
import { APP_MESSAGES, HTTP_STATUS } from '#constants';
import { createPagination } from '#helpers';
import CourierRepository from '#repository/courier'
import {
   existCourierEmail,
   existCourierPhone,
   existVehicleType,
} from '#couriersmodule/core/index';
import {
   comparateChanges
} from '#helpers';

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
   const courier = CourierRepository.findOneById(id);
   if (!courier) {
      throw error(APP_MESSAGES.COURIER.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
   }
   return courier;
};

const update = async (id, changes) => {
   const actualCourier = await CourierRepository.findOneById(id);
   if (!actualCourier) {
      throw error(APP_MESSAGES.COURIER.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
   }
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
   const courrier = await CourierRepository.findOneById(id);
   if (!courrier) {
      throw error(APP_MESSAGES.COURIER.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
   }
   const passwordHash = await bcrypt.hash(newPassword, 10);
   await CourierRepository.update(id, { password: passwordHash });
   return;
};

const changeStatus = async (id, newStatus) => {
   const courier = await CourierRepository.findOneById(id);
   if (!courier) {
      throw error(APP_MESSAGES.COURIER.NOT_FOUND(id), {}, HTTP_STATUS.NOT_FOUND);
   }
   const { status } = courier.toJSON();
   if (status === newStatus) {
      throw error(APP_MESSAGES.COURIER.STATUS_ALREADY_SET(id, newStatus));
   }
   await CourierRepository.update(id, { status: newStatus });
   return;
};

export default {
    getAll,
    create,
    getById,
    update,
    changePassword,
    changeStatus,
};