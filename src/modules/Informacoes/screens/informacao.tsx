/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import { View } from 'react-native';
import React from 'react';
import Overlay from 'react-native-loading-spinner-overlay';
import { useRequest } from '../../../shared/hooks/useRequest';
import Text from '../../../shared/components/text/Text';
import { textTypes } from '../../../shared/components/text/textTypes';

const Informacao = () => {
  const { loading } = useRequest();

  return (
    <View style={{flex: 1,
      justifyContent: 'center',
      alignItems: 'center'}}>
      <Overlay visible={loading} />

      <Text style={{textAlign: 'center',
    fontSize: 18}} type={textTypes.PARAGRAPH_LIGHT}>
        <Text type={textTypes.TITLE_BOLD} >Conecta</Text>
        {'\n'}  {'\n'}

        <Text type={textTypes.TITLE_REGULAR} >Sobre a Experiência</Text>

        {'\n'}  {'\n'}
        <Text type={textTypes.PARAGRAPH_REGULAR} style={{fontSize: 18}}>Venha conhecer um olival e se deliciar com um delicioso Brunch bem pertinho de BH,
          no Vila Moura Olival. Com um visual de tirar o fôlego, o cerrado predomina entre as montanhas,
          os cursos d'água e as cachoeiras, bem ao lado do Parque Nacional da Serra do Gandarela.</Text>{'\n'}
        <Text  type={textTypes.PARAGRAPH_REGULAR} style={{fontSize: 18}}>Você será recebido pelo proprietário do Vila Moura, para um passeio no Olival, seguido de um <Text type={textTypes.PARAGRAPH_BOLD} style={{fontSize: 18}}>delicioso brunch</Text> no ,
          com todos os itens de produção própria, desde os pães de fermentação natural às geleias feitas com frutas do quintal 	<Text type={textTypes.PARAGRAPH_BOLD} style={{fontSize: 18}}>e prova do azeite produzido na propriedade</Text>.
        </Text>{'\n'}{'\n'}{'\n'}
        <Text  type={textTypes.PARAGRAPH_REGULAR} style={{fontSize: 18}}>Att.</Text>

      </Text>
    </View>
  );
};
export default Informacao;
