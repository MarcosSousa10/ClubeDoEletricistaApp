/* eslint-disable prettier/prettier */
import { RefreshControl, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeContainerInfo, PerfilButton, PerfilImage, PerfilText, PerfilTextm, PerfilView} from '../styles/perfil.style';
import Button from '../../../shared/components/button/Button';
import {gettCodProf, logout} from '../../../shared/functions/connection/auth';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useRequest} from '../../../shared/hooks/useRequest';
import {MethodEnum} from '../../../enums/methods.enum';
import {InformacaoType} from '../../../types/InformacaoType';
import moment from 'moment';
import {textTypes} from '../../../shared/components/text/textTypes';
import {theme} from '../../../shared/themes/theme';
import {MenuUrl} from '../../../shared/components/enums/MenuUrl.enum';
// import Overlay from 'react-native-loading-spinner-overlay';

const Perfil = () => {
  const [informacao, setInformacao] = useState<InformacaoType>();
  const {request, loading} = useRequest();
  const verifyLogin = async () => {
    request<InformacaoType>({
      url: `https://othondecarvalho.com.br:5555/pc/informacao/${await gettCodProf()}`,
      method: MethodEnum.GET,
    })
      .then(Response => {
        setInformacao(Response);
      })
      .catch(() => {
        logout(navigation);
      });
  };

  useEffect(() => {
    verifyLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={verifyLogin} />
      }>
      {/* <Overlay visible={loading} /> */}
      <HomeContainerInfo>
        <PerfilText
          color="black"
          type={textTypes.PARAGRAPH_REGULAR}
          >
          Nome: {informacao?.descricao}
        </PerfilText>
        <PerfilText
          color="black"
          type={textTypes.PARAGRAPH_REGULAR}
          >
          Data de Cadastro: {moment(informacao?.dtcadastro).format('DD/MM/YY')}
        </PerfilText>
        <PerfilText
          color="black"
          type={textTypes.PARAGRAPH_REGULAR}
          >
          cnpj: {informacao?.cnpj}
        </PerfilText>
        <PerfilText
          color="black"
          type={textTypes.PARAGRAPH_REGULAR}
          >
          codigo do profissional: {informacao?.codprofissional}
        </PerfilText>
        <PerfilTextm
          color="black"
          type={textTypes.PARAGRAPH_REGULAR}
          >
          Data Da Ultima Compra:{' '}
          {informacao?.tipoprof
            ? moment(informacao?.tipoprof).format('DD/MM/YYYY')
            : 'Não Foi Localizado Data Da Ultima Compra'}
        </PerfilTextm>
        <PerfilButton
          title="Alterar Cadastro"
          type={theme.buttons.buttonsTheme.secondary}
          onPress={() => navigation.navigate(MenuUrl.EDITAR)}
        />
      </HomeContainerInfo>
      <PerfilView >
        <PerfilImage
          resizeMode="contain"
          source={require('./image/pretoLuminato.png')}
        />
      </PerfilView>
      <View>
        <Button
          title="SAIR"
          onPress={() => {
            logout(navigation);
          }}
        />
      </View>
    </ScrollView>
  );
};
export default Perfil;
