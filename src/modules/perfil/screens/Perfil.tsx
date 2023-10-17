/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import Text from '../../../shared/components/text/Text';
import React from 'react';
import { HomeContainerInfo } from '../styles/perfil.style';
import Button from '../../../shared/components/button/Button';
import { logout } from '../../../shared/functions/connection/auth';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const Perfil = () => {

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View>
     <HomeContainerInfo>
                <Text color="black">Nome:</Text>
                <Text color="black">Data de Cadastro:</Text>
                <Text color="black">cnpj:</Text>
                <Text color="black">codprofissional:</Text>
                <Text color="black">dtcadastro:</Text>
      </HomeContainerInfo>
      <View>
                <Button title="SAIR" onPress={() => { logout(navigation); }} />
            </View>
    </View>
  );
};
export default Perfil;
