import { error } from '#helpers';
import { APP_MESSAGES } from '#constants';

// Documentación JSDoc
/**
 * Comparar nuevas asociaciones con asociaciones válidas y encontrar asociaciones inválidas.
 * @param {Array<Object>} newAssociations - El nuevo conjunto de asociaciones a validar.
 * @param {Array<Object>} validAssociations - El conjunto de asociaciones válidas.
 * @throws {Error} Si se encuentran asociaciones inválidas.
 * @example
 * const newAssociations = [
 *   { id: 1 },
 *   { id: 2 },
 *   { id: 4 }, // Inválido
 * ];
 *
 * const validAssociations = [
 *   { id: 1 },
 *   { id: 2 },
 *   { id: 3 },
 * ];
 * findInvalidAssociations(newAssociations, validAssociations);
 * // Lanza un error con el mensaje de asociaciones inválidas
 */

export const findInvalidAssociations = (newAssociations, validAssociations) => {
   const validIds = validAssociations.map(item => item.id);
   const invalidAssociations = newAssociations.filter(item => !validIds.includes(item.id));
   if (invalidAssociations.length > 0)
      throw error(APP_MESSAGES.ERROR.INVALID_ASSOCIATIONS, {
         invalid_associations: invalidAssociations,
      });
   return;
};
