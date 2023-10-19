/* eslint-disable prettier/prettier */
export const removeSpacialCharacters = (value: string) => {
  return value.replace(/\D/g, '');
};
