/* eslint-disable prettier/prettier */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import {AUTORIZATION_KEY} from '../../constants/authorizationConstants';
import {getItemStorage, removeItemStorage, setItemStorage} from '../storageProxy';
import { MenuUrl } from '../../components/enums/MenuUrl.enum';

export const unsetAuthorizationToken = () =>
  removeItemStorage(AUTORIZATION_KEY);

export const setAuthorizationToken = async (token: string) =>{
  setItemStorage(AUTORIZATION_KEY, token);
};

export const getAuthorizationToken = async () =>
  getItemStorage(AUTORIZATION_KEY);

export const logout = (navigate: NavigationProp<ParamListBase>) => {
  unsetAuthorizationToken();
  navigate.reset({
    index: 0,
    routes: [{ name: MenuUrl.LOGIN }],
  });
};
