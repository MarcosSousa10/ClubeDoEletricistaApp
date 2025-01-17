/* eslint-disable prettier/prettier */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { AUTORIZATION_KEY, CODPROD_Cnpj, CODPROD_KEY } from '../../constants/authorizationConstants';
import { getItemStorage, removeItemStorage, setItemStorage } from '../storageProxy';
import { MenuUrl } from '../../components/enums/MenuUrl.enum';
export const setCodCnpj = async (cod: string) => {
  setItemStorage(CODPROD_Cnpj, cod);
};
export const gettCodCnpj = async () =>
  getItemStorage(CODPROD_Cnpj);
export const unsetCodCnpj = () =>
  removeItemStorage(CODPROD_Cnpj);
export const unsetAuthorizationToken = () =>
  removeItemStorage(AUTORIZATION_KEY);

export const setAuthorizationToken = async (token: string) => {
  setItemStorage(AUTORIZATION_KEY, token);
};
export const setCodProf = async (cod: string) => {
  setItemStorage(CODPROD_KEY, cod);
};

export const gettCodProf = async () =>
  getItemStorage(CODPROD_KEY);
export const unsetCodProf = () =>
  removeItemStorage(CODPROD_KEY);
export const getAuthorizationToken = async () =>
  getItemStorage(AUTORIZATION_KEY);

export const logout = (navigate: NavigationProp<ParamListBase>) => {
  unsetAuthorizationToken();
  unsetCodProf();
  unsetCodCnpj();
  navigate.reset({
    index: 0,
    routes: [{ name: MenuUrl.LOGIN }],
  });
};
