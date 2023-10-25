/* eslint-disable prettier/prettier */
import React from 'react';
import Overlay from 'react-native-loading-spinner-overlay';
import {useRequest} from '../../../shared/hooks/useRequest';
import Text from '../../../shared/components/text/Text';
import {textTypes} from '../../../shared/components/text/textTypes';
import { InfoText, InfoTextCenter, InfoView } from '../style/Informacao.style';

const Informacao = () => {
  const {loading} = useRequest();

  return (
    <InfoView>
      <Overlay visible={loading} />

      <InfoTextCenter
        type={textTypes.PARAGRAPH_LIGHT}>
        <Text type={textTypes.TITLE_BOLD}>Conecta</Text>
        {'\n'} {'\n'}
        <Text type={textTypes.TITLE_REGULAR}>Sobre a Experiência</Text>
        {'\n'} {'\n'}
        <InfoText type={textTypes.PARAGRAPH_REGULAR} >
          Venha conhecer um olival e se deliciar com um delicioso Brunch bem
          pertinho de BH, no Vila Moura Olival. Com um visual de tirar o fôlego,
          o cerrado predomina entre as montanhas, os cursos d'água e as
          cachoeiras, bem ao lado do Parque Nacional da Serra do Gandarela.
        </InfoText>
        {'\n'}
        <InfoText type={textTypes.PARAGRAPH_REGULAR} >
          Você será recebido pelo proprietário do Vila Moura, para um passeio no
          Olival, seguido de um{' '}
          <InfoText type={textTypes.PARAGRAPH_BOLD} >
            delicioso brunch
          </InfoText>{' '}
          no , com todos os itens de produção própria, desde os pães de
          fermentação natural às geleias feitas com frutas do quintal{' '}
          <InfoText type={textTypes.PARAGRAPH_BOLD} >
            e prova do azeite produzido na propriedade
          </InfoText>
          .
        </InfoText>
        {'\n'}
        {'\n'}
        {'\n'}
        <InfoText type={textTypes.PARAGRAPH_REGULAR} >
          Att.
        </InfoText>
      </InfoTextCenter>
    </InfoView>
  );
};
export default Informacao;
