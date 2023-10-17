/* eslint-disable prettier/prettier */
import {useState} from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useRequest } from '../../../shared/hooks/useRequest';

export const useLogin = () => {
  const [login, setCpnj] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {authRequest,InfoRequests } = useRequest();
  const handleOnPress = async () => {
    authRequest({
        login,
        password,
     });
     InfoRequests({
      login,
      password,
   }).then(resposta=> console.log(resposta));
     };
  const handleOnChangeCnpj = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setCpnj(event.nativeEvent.text);
  };
  const handleOnChangePassword = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(event.nativeEvent.text);
  };
  return {
    login,
    password,
    handleOnChangePassword,
    handleOnChangeCnpj,
    handleOnPress,
  };
};
