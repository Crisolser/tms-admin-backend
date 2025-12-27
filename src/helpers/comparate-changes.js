import { error } from '#helpers';
import { APP_MESSAGES } from '#constants';

/**
 * Comparar cambios nuevos contra datos actuales y retornar solo los cambios que son diferentes.
 * @param {Object} changes - Objeto que contiene los cambios propuestos.
 * @param {Object} actualData - Objeto que contiene los datos actuales.
 * @return {Object} Un objeto que contiene dos propiedades: newData y oldData.
 * newData contiene solo los campos que han cambiado con sus nuevos valores.
 * oldData contiene los valores anteriores de los campos que han cambiado.
 * @throws {Error} Si no hay cambios entre los datos nuevos y actuales.
 * @example
 * const changes = {
 *   name: 'Nuevo Nombre',
 *   email: 'nuevoemail@example.com',
 *   isActive: true
 * };
 * const actualData = {
 *   name: 'Nombre Antiguo',
 *   email: 'antiguoemail@example.com',
 *   isActive: false
 * };
 * const result = comparateChanges(changes, actualData);
 * // result será:
 * // {
 * //   newData: {
 * //     name: 'Nuevo Nombre',
 * //     email: 'nuevoemail@example.com',
 * //     isActive: true
 * //   },
 * //   oldData: {
 * //     name: 'Nombre Antiguo',
 * //     email: 'antiguoemail@example.com',
 * //     isActive: false
 * //   }
 * // }
 */

export const comparateChanges = (changes, actualData) => {
  let oldData = {};
  let objectChanges = { ...changes };
  let changeKeys = Object.keys(objectChanges);
  for (let i = 0; i < changeKeys.length; i++) {
    const key = changeKeys[i];
    if (objectChanges[key] === actualData[key]) {
      delete objectChanges[key];
    } else {
      oldData[key] = actualData[key];
    }
  }

  changeKeys = Object.keys(objectChanges);
  if (changeKeys.length == 0) throw error(APP_MESSAGES.ERROR.NOT_CHANGED);

  return { newData: objectChanges, oldData };
};