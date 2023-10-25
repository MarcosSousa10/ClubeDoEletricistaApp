/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import { theme } from '../../../shared/themes/theme';
import Text from '../../../shared/components/text/Text';
import { Image } from 'react-native';
import Button from '../../../shared/components/button/Button';

export const HomeContainerInfo = styled.View`
  border-radius: 4px;
  border-color: ${theme.colors.neutraTheme.black};
  border-width: 1px;
  padding: 8px;
  margin: 20px;
`;
export const PerfilText = styled(Text)`
font-size: 16px;
`;
export const PerfilTextm = styled(PerfilText)`
margin-bottom: 30px;
`;
export const PerfilImage = styled(Image)`
width: 200px;
height: 100px;
margin-bottom: 24px;
`;
export const PerfilView = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

export const PerfilButton = styled(Button)`
margin-bottom: 2px;
`;



