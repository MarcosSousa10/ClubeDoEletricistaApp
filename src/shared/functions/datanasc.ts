/* eslint-disable prettier/prettier */
export const insertMaskIDataNasc = (cpf: string) => {
  return cpf.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
};
