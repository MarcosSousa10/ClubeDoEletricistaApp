/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, View} from 'react-native';
import { ContainerLogin, Imagelog } from '../styles/login.styles';
import Input from '../../../shared/components/input/input';
import { useLogin } from '../hooks/useLogin';
import Button from '../../../shared/components/button/Button';
import { theme } from '../../../shared/themes/theme';
import Text from '../../../shared/components/text/Text';
import { textTypes } from '../../../shared/components/text/textTypes';

export const Login = () => {
  const {login,handleOnChangeCnpj,password,handleOnChangePassword,handleOnPress,loading} = useLogin();


  return (
    <View>
      <ContainerLogin>
      <Imagelog resizeMode="contain" source={require('../../../assets/images/download.png')}/>
      <Input value={login} margin="0px 0px 8px 0px" title="CPF ou CNPJ:" onChange={handleOnChangeCnpj} placeholder="Digite Seu CPF ou CNPJ"/>
      <Input value={password} onChange={handleOnChangePassword}  placeholder="Digite sua senha" title="Senha:" secureTextEntry/>
      <TouchableOpacity >
            <Text
            margin="16px"
            type={textTypes.PARAGRAPH_SEMI_BOLD}
            color={theme.colors.mainTheme.primary}
            >
              Cadastrar
            </Text>
        </TouchableOpacity>
      <Button
          loading={loading}
          type={theme.buttons.buttonsTheme.primary}
          title="ENTRAR"
          onPress={handleOnPress}
        />
      </ContainerLogin>
    </View>
  );
};
