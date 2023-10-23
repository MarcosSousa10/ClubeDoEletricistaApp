/* eslint-disable prettier/prettier */
export const insertMaskInCep = (cep: string) => {
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
};
