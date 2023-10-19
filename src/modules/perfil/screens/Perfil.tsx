/* eslint-disable prettier/prettier */
import { Image, RefreshControl, ScrollView, View } from 'react-native';
import Text from '../../../shared/components/text/Text';
import React, { useEffect, useState } from 'react';
import { HomeContainerInfo } from '../styles/perfil.style';
import Button from '../../../shared/components/button/Button';
import { gettCodProf, logout } from '../../../shared/functions/connection/auth';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useRequest } from '../../../shared/hooks/useRequest';
import { MethodEnum } from '../../../enums/methods.enum';
import { InformacaoType } from '../../../types/InformacaoType';
import moment from 'moment';
// import Overlay from 'react-native-loading-spinner-overlay';

const Perfil = () => {
  const [informacao, setInformacao] = useState<InformacaoType>();
  const { request,loading } = useRequest();
  const verifyLogin = async () => {
    request<InformacaoType>({
      url: `https://othondecarvalho.com.br:5555/pc/informacao/${await gettCodProf()}`,
      method: MethodEnum.GET,
    }).then((Response) => { setInformacao(Response); });
  };

  useEffect(() => {
   
    verifyLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={loading}
        onRefresh={verifyLogin}
      />
    }
    >
            {/* <Overlay visible={loading} /> */}
      <HomeContainerInfo>
          <Text color="black">Nome: {informacao?.descricao}</Text>
          <Text color="black">Data de Cadastro: {moment(informacao?.dtcadastro).format("DD/MM/YY")}</Text>
          <Text color="black">cnpj: {informacao?.cnpj}</Text>
          <Text color="black">codigo do profissional: {informacao?.codprofissional}</Text>
          <Text color="black">Data Da Ultima Compra: {informacao?.tipoprof ? moment(informacao?.tipoprof).format("DD/MM/YYYY") : "Não Foi Localizado Data Da Ultima Compra"}</Text>
        </HomeContainerInfo>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image resizeMode="contain" style={{width: 200 , height: 100 , marginBottom: 24}} source={require('./image/pretoLuminato.png')} />

        </View>
        <View>
            <Button title="SAIR" onPress={() => { logout(navigation); } } />
          </View>
    </ScrollView>
  );
};
export default Perfil;


