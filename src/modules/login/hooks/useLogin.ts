/* eslint-disable prettier/prettier */
import {useState} from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useRequest } from '../../../shared/hooks/useRequest';

export const useLogin = () => {
  const [login, setCpnj] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {authRequest,loading } = useRequest();
  const handleOnPress = async () => {
    authRequest({
        login,
        password,
     });
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
    loading,
    login,
    password,
    handleOnChangePassword,
    handleOnChangeCnpj,
    handleOnPress,
  };
};
