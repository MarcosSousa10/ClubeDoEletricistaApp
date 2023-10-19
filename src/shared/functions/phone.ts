/* eslint-disable prettier/prettier */
import {removeSpacialCharacters} from './caracteres';

export const insertMaskInPhone = (phone: string) => {
    const noMask = removeSpacialCharacters(phone);
    return noMask.replace(/(\d{2})(\d)/, '($1) $2')
    .replace(phone.length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
  };
export const validatePhone = (phone: string ): boolean => {
    const noMask = removeSpacialCharacters(phone);
  return noMask.length === 11 || noMask.length === 10;
};
