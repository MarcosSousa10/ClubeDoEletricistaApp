/* eslint-disable prettier/prettier */
import {useState} from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useRequest } from '../../../shared/hooks/useRequest';
import { MenuUrl } from '../../../shared/components/enums/MenuUrl.enum';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

export const useLogin = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [login, setCpnj] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {authRequest,loading,setErrorMessage,errorMessage} = useRequest();
  const handleOnPress = async () => {
    authRequest({
        login,
        password,
     });
     };
  const handleGoToCreateUser = ()=>{
    navigation.navigate(MenuUrl.CADASTRO);
    };
  const handleOnChangeCnpj = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setErrorMessage('');
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
    errorMessage,
    password,
    handleOnChangePassword,
    handleOnChangeCnpj,
    handleOnPress,
    handleGoToCreateUser,
  };
};
