/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {theme} from '../../../shared/themes/theme';
import { Icon } from '../../../shared/icon/Icon';
import Text from '../../../shared/components/text/Text';

export const CreateUserContainer = styled.ScrollView`
  background-color: ${theme.colors.neutraTheme.white};
  padding: 16px;
`;
export const CreateUserView = styled.View`
align-items: center;
margin-bottom: 20;
`;

export const CreateUserIcon = styled(Icon)`
position: absolute;
right: 56px;
top: 4px;
`;
export const CreateUserText = styled(Text)`
text-align: center;
`;
