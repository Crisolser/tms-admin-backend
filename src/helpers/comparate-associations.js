import { error } from '#helpers';
import { APP_MESSAGES } from '#constants';

/**
 * Compara dos conjuntos de asociaciones y determina cuáles deben ser creadas o eliminadas
 * basándose en un parámetro activo.
 * @param {Array<Object>} newAssociations - El nuevo conjunto de asociaciones con el parámetro activo.
 * @param {Array<Object>} actualAssociations - El conjunto actual de asociaciones.
 * @param {string} activeParameter - El nombre del parámetro que indica si una asociación está activa.
 * @return {Object} Un objeto que contiene dos arreglos: createData y deleteData.
 * @throws {Error} Si no hay cambios entre las asociaciones nuevas y actuales.
 * @example
 * const newData = [
 *   { id: 1, is_active_in_admin: false },
 *   { id: 2, is_active_in_admin: true },
 *   { id: 3, is_active_in_admin: false },
 *   { id: 5, is_active_in_admin: true },
 * ];
 *
 * const actualData = [
 *  { id: 1 },
 *  { id: 2 },
 *  { id: 3 },
 * ];
 *
 * const result = comparateAssociations(newData, actualData, 'is_active_in_admin');
 * // result será:
 * // {
 * //   createData: [2, 5],
 * //   deleteData: [1, 3]
 * // }
 */

export const comparateAssociations = (newAssociations, actualAssociations, activeParameter) => {
   if (newAssociations.length === 0) throw error(APP_MESSAGES.ERROR.NOT_CHANGED);
   let activeNewAssociations = newAssociations.filter(item => item[activeParameter]);
   let desactiveNewAssociations = newAssociations.filter(item => !item[activeParameter]);
   let actualAssociationsIds = actualAssociations.map(item => item.id);
   let createData = activeNewAssociations
      .filter(item => !actualAssociationsIds.includes(item.id))
      .map(item => item.id);
   let deleteData = desactiveNewAssociations
      .filter(item => actualAssociationsIds.includes(item.id))
      .map(item => item.id);
   if (createData.length === 0 && deleteData.length === 0)
      throw error(APP_MESSAGES.ERROR.NOT_CHANGED);
   return { createData, deleteData };
};
