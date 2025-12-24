import { error } from '#helpers';
import { APP_MESSAGES } from '#constants';

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