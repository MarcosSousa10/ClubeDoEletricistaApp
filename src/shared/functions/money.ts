/* eslint-disable prettier/prettier */
export const convertnumbertomoney = (value: number) => {
    if (typeof value === 'number') {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
        return value;
    }
  };
